const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
var cors = require('cors')
// mongodb+srv://user:<password>@cluster0.adt1pnf.mongodb.net/?retryWrites=true&w=majority



const multer  = require("multer");
app.use(multer({dest:"uploads"}).single("filedata"));


//app.listen(3000)
app.set('view engine', 'ejs')
app.use('/public/', express.static('./public'));
app.use('/uploads', express.static(path.join(__dirname, './uploads/')))

const PORT = 3001

const taskRouter = require('./routes/spending')
app.use(cors())

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use('/api',taskRouter) 

async function start() {
    try {
      await mongoose.connect(
        'mongodb://0.0.0.0:27017/', { useNewUrlParser: true, useUnifiedTopology: true }
      ).then(() => {
        console.log(`CONNECTED TO MONGO!`);
      })
      app.listen(PORT, () => {
        console.log('Server has been started on port ',PORT,'...')
      })
    } catch (e) {
      console.log(e)
    }
  }
  
  start()
  
