const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
    // console.log(req)
    // res.json({msg: req.body})
    // res.send()
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
        const jwtSecret = "jwtSecret";
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
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

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