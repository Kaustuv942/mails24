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
