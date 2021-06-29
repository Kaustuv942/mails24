const express = require('express');
const userRouter = express.Router();
const userController = require('../../controllers/user.js');

userRouter.post('/signup', userController.signUp);
userRouter.post('/login', userController.login);
userRouter.post('/gsync',userController.gsync);
userRouter.get('/userdata/:email',userController.userdata);

module.exports=userRouter;
