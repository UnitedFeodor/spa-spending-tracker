const express = require('express')
const Dinero = require('dinero.js')
const router = express.Router()
const multer  = require("multer");
const postModel = require("../model/post");
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');

//router.use(multer({dest:"uploads"}).single("filedata"));


const helper = require('../model/helper'); 


var list = [
    { _id: "1",amount: "1000", type: "food", comments: "cola pizza burgir", date: new Date(), image: null },
    { _id: "2",amount: "12000", type: "gym", comments: "gachi is life" , date: new Date(), image: 'uploads\\maxresdefault.jpg' },
    { _id: "3",amount: Dinero({amount: 300,currency: 'USD'}), type: "coke", comments: "mmm delicious" , date: new Date(), image: null }
    ]; 

let dailyLimit = Dinero({amount: 100000,currency: 'USD'});
let limits = helper.setLimitsFromDaily(dailyLimit,3,2023)

let params = {
    list,
    limits, 
    helper
}
params.helper = helper
function addNewSpending(amount,type,comments,date,image) {
    let entry = {amount,type,comments,date,image}
    params.list.push(entry)
}
function formNewSpending(amount,type,comments,date,image) {
    let entry = {amount,type,comments,date,image}
    return entry
}

function formNewSpendingWithId(_id,amount,type,comments,date,image) {
    let entry = {_id,amount,type,comments,date,image}
    //console.log("in formNewSpendingWithId: ",_id," and ",entry._id)
    return entry
}


router.get('/spendings', async (req,res) => {
    console.log("get /")
    const dbPosts = await postModel.find({})

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

    params.limits = helper.getFullLimitsInfo(limits,dineroList)

    res.json(params)
})

router.delete('/spendings/:id', async (req,res) => { 
    console.log("delete /",req.params.id)

    const _id = new mongoose.Types.ObjectId(req.params.id)
    let dbPost
    try {
        dbPost = await postModel.findById(_id)
        console.log("dbPsot",dbPost)
        //console.log(await postModel.countDocuments(_id))// 1
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
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
        res.send("OK")
        //res.redirect("/")
    } catch (error) {
        res.status(500).send(error);
    }


})

router.get('/add',(req,res) => {
    console.log("get /add")
     
    res.render('add', params)
})


router.post('/add', async (req,res) => {
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

    let filedata = req.file;
    console.log("filedata",filedata);
    if (!filedata) {
        filedata = null
    } else {
        console.log(filedata.path);
        filedata = filedata.path
    }
        
    //addNewSpending(amount, spendingType, comments, date, filedata)

    let newPost = formNewSpending(helper.dineroToFormattedNumberUSD(amount), spendingType, comments, date, filedata)
    let post = new postModel(newPost)
    //post.markModified('amount')
    try {
        await post.save();
        res.send("OK")
        //res.redirect('/')
    } catch (error) {
        response.status(500).send(error);
    }

    
})

router.get('/limits',(req,res) => {
    console.log("get /limits")
     
    res.render('limits', params)
})

router.post('/limits',(req,res) => {
    console.log("post /limits")
    const amount = helper.parseUSDFromFormattedString(req.body.amount)
    console.log(amount.getAmount() + amount.getCurrency())
    const limitType = req.body.type;
    console.log(limitType)
    const currDate = new Date()
    const newLimits = helper.chooseLimitFuncByInput(limitType,amount,currDate.getMonth()+1,currDate.getFullYear())
    params.limits = newLimits
    res.redirect('/')
})

/*

router.get('/:id',(req,res) => {
    res.send(`get page with id ${req.params.id}`)
})
*/
module.exports = router