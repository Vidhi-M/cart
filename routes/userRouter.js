const express = require ('express');
const { RequestTimeout } = require('http-errors');
const userRouter = express.Router();
const userMiddle = require('../Utilities/userMiddle');
const userController = require('../controller/userController');

userRouter.post('/signup',userMiddle.signupHelper ,userController.signup);
userRouter.post('/login',userController.login);
userRouter.get('/logout',userController.logout);

userRouter.all('*',invalid);
async function invalid(req,res){   // sends 404 back to user if any url is not found 
    res.send(404).json({
        message : 'Resource not found'
    })
}

module.exports= userRouter;