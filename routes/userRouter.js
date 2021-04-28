const express = require('express');
const userRouter = express.Router();


const userController = require('../controller/userController')

userRouter.post('/login',userController.login)
userRouter.post('/signup',userController.signup)
userRouter.get('/user', userController.user)
userRouter.get('/', (req, res) => {
    res.json({ message: '200ok' })
    res.end()
})
module.exports = userRouter



