const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "jwtSecret";


exports.userdata = async (req, res, next) => {
    var email = req.params.email;
    User.findOne({ email }).then((user) => {
        if (!user) {
            res.status(204).json({
                msg: "No user found",
        });
        } else {
            res.status(200).json({
                user: user,
        });
        }
    });
}

exports.signUp = async (req, res, next) => {
    // console.log(req)
    // res.json({msg: req.body})
    // res.send()
    try{
        const { email, password } = req.body;
        user = await User.findOne({email})
        if(user){
            console.log("User Already Exists!");
            res.status(400).json({msg:"User Already Exists!"})
        }
        else{
            const newUser = new User({
                email,
                password,
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                const user = await newUser.save()
                jwt.sign(
                    { id: user.id },
                    jwtSecret,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if(err) throw err;
                        res.status(200).json({
                            token,
                            user: {
                                gId: user.gId,
                                id: user.id,
                                email: user.email
                            }
                        })
                        }
                    )
                })
            })
        }
    }
    catch(e){
        console.log(e.message)
        res.status(403).send({error: e.message})
    }
    
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;    
    try{
        User.findOne({ email }).then((user) => {
            if (!user) return res.status(203).json({ msg: "User does not exists" });
    
            bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) return res.status(209).json({ msg: "Invalid Credentials" });
            jwt.sign(
                { id: user.id },
                jwtSecret,
                { expiresIn: 3600 },
                (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                    gId: user.gId,
                    id: user.id,
                    email: user.email,
                    },
                });
                }
            );
            });
        });
    }
    catch(e){
        console.log(e.message)
        res.status(400).send({error: e.message})
    }    
}

exports.gsync = async (req, res, next) => {
    const gId = req.body.profileObj.googleId;
  const email = req.body.profileObj.email;
  const name = req.body.profileObj.name;
  const imageUrl = req.body.profileObj.imageUrl;
  const accessToken = req.body.accessToken;

  User.findOne({ email }).then((user) => {
    if (!user) {
      // New user creation, no email field
      const newUser = new User({
        gId,
        name,
        imageUrl,
        email,
        accessToken,
      });
      newUser.gId = gId;
      newUser.email = email;
      newUser.name = name;
      newUser.imageUrl = imageUrl;
      newUser.accessToken = accessToken;
      newUser.save();
      console.log("Created New User");
      res.status(200).json({
        gId: gId,
        id: newUser.id,
        email: newUser.email,
      });
    } else {
      // use the same doc
      user.gId = gId;
      user.email = email;
      user.name = name;
      user.imageUrl = imageUrl;
      user.accessToken = accessToken;
      user.save();
      console.log("updated existing User");
      res.status(200).json({
        gId: gId,
        id: user.id,
        email: user.email,
      });
    }
  });
}