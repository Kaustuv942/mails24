let express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./models/User');

let app = express();
app.use(cors());
app.use(express.json());

var port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Welcome to Express 1.0'));


app.listen(port, function() {
    console.log("Running FirstRest on Port "+ port);
})



const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:admin@msgscheduler.r00cg.mongodb.net/FLIPRMSGSCHEDULER?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

const nodemailer = require('nodemailer');


// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'personal.kkc942@gmail.com',
//     pass: 'joker@123' // naturally, replace both with your real credentials or an application-specific password
//   }
// });
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      type: 'OAuth2',
      clientId: '694843719794-bb6te2lcpm1gcbj6pgki6tmd4de4j2fb.apps.googleusercontent.com',
      clientSecret: 'V2WxstHlYNrnASVYR5Efv7g_'
  }
});
// const mailOptions = {
//   from: 'personal.kkc942@gmail.com',
//   to: 'kaustuv942@gmail.com',
//   // cc:'kkc.19u10500@btech.nitdgp.ac.in',
//   // bcc:'kaustuv942@gmail.com',
//   subject: 'Flipr Mailer Works',
//   text: 'Let us get this up and running'
// };

/// THIS WORKS::
// transporter.sendMail({
//   from: 'apsingh1843@gmail.com',
//   to: 'kaustuv942@gmail.com',
//   // cc:'kkc.19u10500@btech.nitdgp.ac.in',
//   // bcc:'kaustuv942@gmail.com',
//   subject: 'Flipr Mailer Works: Revision 2',
//   text: 'Send Mail Api Works',
//   auth: {
//       user: 'apsingh1843@gmail.com',
//     //   refreshToken: '1//04PeaRRxQepXfCgYIARAAGAQSNwF-L9IroDPofc1F4M8a0E-scC550DnVy5h_hOAs9WowULZYaUW42owSILtat4EYUK0YS-_5NKQ',
//       accessToken: 'ya29.a0AfH6SMBgm-vsyqZ8zw9HHs4wX2V4zm3csaRmKTLWyDRDIhmf0AUlK02v3bbetDCC_tHcUhsxg1B-Sra913vwlXIWCCJ1N0XBqgJyo4PucRmyDKsOLGepkhs1STiprvOxcBJUPt5c_ZPXJsrgSHVNLPD850bL',
      
//       // expires: 1484314697598
//   }
// });



// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
// 	console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

console.log('Scheduling')
// Scheduling :

var cron = require('node-cron');
var x= 1;
var y = 1;
const url_taskMap = {};
const str = '* * * * * *'
// const task = cron.schedule(str,()=>{
//     console.log('sendMail'+x)
//     x+=1
// });
// url_taskMap['xyz'] = task;
// const task3 = cron.schedule('*/3 * * * * *',()=>{
//     console.log('3Seconds test'+x)
//     x+=1
// });
// url_taskMap['xyz'] = task;
// for some condition in some code
// const stopper = cron.schedule(' */5 * * * * *',()=>{
//     let my_job = url_taskMap['xyz'];
//     console.log(my_job)
//     console.log(url_taskMap)
//     my_job.stop();
//     console.log('Stopped the current task')
// });
// url_taskMap['3seconds'] = task3;

// const stopper3 = cron.schedule(' */20 * * * * *',()=>{
//     let my_job = url_taskMap['3seconds'];
//     my_job.stop();
//     console.log('Stopped the current task3')
// });

/* 
POST REQ:
/sendMail

---> mail info
---> mail scheduling(3 opts)
---> In each of the options:
1. initialize the job 
2. store it in the db as follows:
a. url_taskmap --> 
3. take the task and store it under the user's history of schedules:


*/
mongoose.connect(uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('mongodb connected...')
})
.catch(err => console.log(err))

//register user
const jwtSecret = 'jwtSecret';

app.post('/api/register', (req, res) => {
  //res.send('register');
  const { name, email, password } = req.body;

  User.findOne({ email })
   .then(user => {
     if (user) return res.status(400).json({ msg: 'User already exists'});
     const newUser = new User({
       name,
       email,
       password
     });

     bcrypt.genSalt(10, (err, salt) =>{
       bcrypt.hash(newUser.password, salt, (err, hash) =>{
         if (err) throw err;
         newUser.password = hash;
         newUser.save()
         .then(user => {

           jwt.sign(
             { id: user.id },
             jwtSecret,
             { expiresIn: 3600 },
             (err, token) => {
               if (err) throw err;
               res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
               });
             }
           )
         });
       })
     })
   })
});

//login
app.post('/api/login', (req, res) => {
  //res.send('login');
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ msg: 'User does not exists'});

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ msg: 'Invalid Credentials'});
          jwt.sign(
            { id: user.id },
            jwtSecret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
               token,
               user: {
                 id: user.id,
                 name: user.name,
                 email: user.email
               }
              });
            }
          )
        })
   })
});
