const express = require('express')
const Dinero = require('dinero.js')
const router = express.Router()
const multer  = require("multer");
const postModel = require("../model/post");
const userModel = require("../model/user");
const refreshTokenModel = require("../model/refreshToken");

const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//router.use(multer({dest:"uploads"}).single("filedata"));

const helper = require('../model/helper'); 
const authJwt = require('../model/authJwt');
const config = require("../config/auth.config");

var list = [
    { _id: "1",amount: "1000", type: "food", comments: "cola pizza burgir", date: new Date(), image: null },
    { _id: "2",amount: "12000", type: "gym", comments: "gachi is life" , date: new Date(), image: 'uploads\\maxresdefault.jpg' },
    { _id: "3",amount: Dinero({amount: 300,currency: 'USD'}), type: "coke", comments: "mmm delicious" , date: new Date(), image: null }
    ]; 

let dailyLimit = Dinero({amount: 10000,currency: 'USD'});
let limits = { limits: helper.setLimitsFromDaily(dailyLimit,3,2023) } 


let params = {
    list,
    limits
}
let limitsObjects = helper.setLimitsFromDaily(dailyLimit,3,2023)


function formNewSpending(amount,type,comments,date,image,author) {
    let entry = {amount,type,comments,date,image,author}
    return entry
}

function formNewSpendingWithId(_id,amount,type,comments,date,image) {
    let entry = {_id,amount,type,comments,date,image}
    //console.log("in formNewSpendingWithId: ",_id," and ",entry._id)
    return entry
}


router.get('/spendings', [authJwt.verifyToken], async (req,res) => {
    console.log("\n\nget /spendings")

    console.log("cookies are ",req.cookies)
    const email = req.cookies['email']
    console.log("email is ",email)

    const dbPosts = await postModel.find().where({author: email})

    //console.log("dbPosts",dbPosts)
    let listToShow = []
    let dineroList = []
    dbPosts.forEach(element => {
        let dineroAmount = { amount: helper.parseUSDFromFormattedString(element.amount) }
        dineroList.push(dineroAmount)
        //console.log("in dbPosts: ",element._id.toString())
        listToShow.push(formNewSpendingWithId(element._id.toString(),element.amount, element.type, element.comments, element.date, element.image))
    }); 

    //listToShow = listToShow.concat(list)
    listToShow.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return b.date - a.date;
      });

    params.list = listToShow

    //console.log("get /spendings params.limits.limits before",params.limits.limits)
    params.limits = helper.getFullLimitsInfo(limitsObjects,dineroList)
    //console.log("get /spendings params.limits.limits after",params.limits.limits)

    res.json(params)
})

router.delete('/spendings/:id', [authJwt.verifyToken], async (req,res) => { 
    console.log("delete /",req.params.id)

    const _id = new mongoose.Types.ObjectId(req.params.id)
    let dbPost
    try {
        dbPost = await postModel.findById(_id)
        const email = req.cookies['email']
        console.log("email",email)
        console.log("dbPost.author",dbPost.author)
        if (dbPost.author !== email) {
            res.status(401).send("Unauthorized access to spendings");
            return;
        }
        console.log("dbPost",dbPost)
        //console.log(await postModel.countDocuments(_id))// 1
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
        return;
    }

    let image = dbPost.image    
    console.log("image value is:",image)
    if (image !== null && image !=='' && image !==' ') {
        console.log("image not null and not empty!!!")
        const filePath = path.join(__dirname,'..',image) 
        console.log(filePath)
        fs.unlinkSync(filePath)
    }

   
    try {
        await postModel.deleteOne(_id)  
        //await postModel.findByID(_id)
        console.log(await postModel.countDocuments(_id))// 0
        res.status(200).send("OK")
    } catch (error) {
        res.status(500).send(error);
    }


})

router.get('/add', [authJwt.verifyToken], (req,res) => {
    console.log("get /add")
    res.status(200).send("OK") 
    //res.render('add', params)
})


router.post('/add', [authJwt.verifyToken], async (req,res) => {
    console.log("post /add")
    console.log(req.body.amount + " = req body amount")

    const amount = helper.parseUSDFromFormattedString(req.body.amount)
    //console.log(amount.getAmount() + amount.getCurrency())
    const spendingType = req.body.type;
    //console.log(spendingType) 
    const comments = req.body.comments;
    //console.log(comments)
    const date = new Date()
    //console.log("date " + date)
    const author = req.cookies['email']

    let filedata = req.file;
    console.log("filedata",filedata);
    if (!filedata) {
        filedata = null
    } else {
        console.log(filedata.path);
        filedata = filedata.path
    }
        
    //addNewSpending(amount, spendingType, comments, date, filedata)

    let newPost = formNewSpending(helper.dineroToFormattedNumberUSD(amount), spendingType, comments, date, filedata,author)
    let post = new postModel(newPost)
    //post.markModified('amount')
    try {
        await post.save();
        res.status(200).send("OK")
        //res.redirect('/')
    } catch (error) {
        res.status(500).send(error);
    }

    
})

router.get('/limits', [authJwt.verifyToken], (req,res) => {
    console.log("get /limits")
     
    res.json(helper.dineroToFormattedNumberUSD(limitsObjects.dailyLimit))
})

router.put('/limits', [authJwt.verifyToken],(req,res) => {
    console.log("put /limits")
    console.log(req.body)
    const amount = helper.parseUSDFromFormattedString(req.body.amount)
    console.log(amount.getAmount() + amount.getCurrency())
    const limitType = req.body.type;
    console.log(limitType)
    const currDate = new Date()
    const newLimits = helper.chooseLimitFuncByInput(limitType,amount,currDate.getMonth()+1,currDate.getFullYear())
    console.log(newLimits)
    limitsObjects = newLimits
    try {
        res.status(200).send("OK")
        //res.redirect('/')
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/register', async (req,res) => {
    console.log('post /register')
    console.log(req.body)
    const email = req.body.email
    const password = req.body.password
    
    let dbLogin
    try {
        dbLogin = await userModel.find({email})
        console.log("dbLogin",dbLogin)
        
        if (dbLogin !== null && dbLogin.length !== 0) {
            res.status(502)
            res.send({error: "Such user already exists!"})
        } else if (email === '' || password === '') { 
            res.status(502)
            res.send({error: "Empty login and password are not allowed!"})
        } else {

            let hashedPassword = bcrypt.hashSync(password, 8);
            let userData = {
                email: email, 
                password: hashedPassword
            }

            let dbUser = new userModel(userData)
            try {
                await dbUser.save();
                res.status(200).send("OK")
            } catch (error) {
                res.status(500).send(error);
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }

    
})

router.post('/login', async (req,res) => {
    console.log('\n\npost /login')
    console.log("req.body",req.body)
    const email = req.body.email
    const password = req.body.password
    //console.log("password",password)

    let userData = {email,password}

    let dbUser
    try {
        dbUser = await userModel.findOne({email})
        
        console.log("dbUser",dbUser)
        //console.log("dbUser.password === password is ",dbUser.password === password,dbUser.password,password)
        if (dbUser === null || dbUser.length === 0) {
            res.send({error: "no such user"})
            return;
        } 

        var passwordIsValid = bcrypt.compareSync(
            password,
            dbUser.password
          );

        if (!passwordIsValid) {
            res.send({error: "incorrect password"})
            return;
        } 

        let refreshToken = await refreshTokenModel.createToken(dbUser);

        let accessToken = jwt.sign({ id: dbUser.email }, config.secret, {
            expiresIn: 10
        });

        //res.setHeader('Set-Cookie','email='+dbUser.email);
        res.cookie('email', dbUser.email);
        res.cookie('refreshToken', refreshToken);

        res.status(200).send({
            accessToken: accessToken
        })
        
        
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

router.post('/logout', async (req,res) => {
    console.log("\n\npost /logout")
    res.cookie('email', '',{maxAge: 0});
    res.cookie('accessToken', '',{maxAge: 0});
    res.cookie('refreshToken', '',{maxAge: 0});
    res.status(200).send("OK") 
})

// router.get('/token', [authJwt.verifyToken], async (req,res) => {
//     res.status(200).send("OK") 
// })
router.get('/token', async (req, res) => {
    console.log("\n\nget /token")
    const requestToken = req.cookies['refreshToken'];
    console.log("req.cookies['refreshToken']: ",req.cookies['refreshToken'])
  
    console.log("requestToken: ",requestToken)
    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }
  
    try {
        let refreshToken = await refreshTokenModel.findOne({ token: requestToken });
    
        console.log("refreshToken: ",refreshToken)
        if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
        }
    
        if (refreshTokenModel.verifyExpiration(refreshToken)) {
            refreshTokenModel.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
            
            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }
    
        let newAccessToken = jwt.sign({ id: refreshToken.user.email }, config.secret, {
            expiresIn: config.jwtAccessExpiration,
        });
    
        //   return res.status(200).json({
        //     accessToken: newAccessToken,
        //     refreshToken: refreshToken.token,
        //   });
        // dbUser = await userModel.findOne({email})
        // if (!dbUser) {
        //     res.status(403).json({ message: "User is not in database!" });
        //     return;
        // }

        res.cookie('refreshToken', refreshToken.token);
        //res.cookie('email', dbUser.email);

        console.log("newAccessToken: ",newAccessToken)
        res.status(200).send({
            accessToken: newAccessToken
        })

    } catch (err) {
        return res.status(500).send({ message: err });
    }
  }
)

module.exports = router