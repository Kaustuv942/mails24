
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser=require('body-parser');
const schedule = require("node-schedule");


const userRouter = require('./routes/api/user')
const mailRouter = require('./routes/api/mail.js')
const jobRouter = require('./routes/api/job.js')
require('dotenv').config()

const port = process.env.PORT || 8080;

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then((db) => {
    console.log("connected to db...")
})
.catch((err) => {
    console.log("err", err)
})

const app=express();
app.use(cors());
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json());


app.use('/auth', userRouter);
app.use('/mail', mailRouter);
app.use('/job', jobRouter);
app.get('/', (req, res) => res.send('Welcome to Mails24 backend!'));


app.listen(port, function () {
    console.log("Running FirstRest on Port " + port);
});
  




