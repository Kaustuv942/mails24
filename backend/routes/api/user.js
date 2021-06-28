const express = require('express');
const userRouter = express.Router();
const userController = require('../../controllers/user.js');


userRouter.get('/test', (req, res) => {
    res.send('User route testing!')
});

userRouter.post('/signup', userController.signUp);

module.exports=userRouter;
