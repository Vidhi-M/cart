const express = require('express');
const session = require('express-session');
const User = require('../model/User')
const bcrypt = require('bcrypt');

exports.user = async (req, res, next) => {
    try {
        const { username } = req.session.user
        const user = await User.where({username}).findOne()
        if (!user) { // This should never happen
            const error = new Error('unauthorized')
            error.status = 401
            throw error   
        }
        res.status(201).json({
            message:'user data fetched',
            data: user
        })
        res.end()
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body
    try {
        const user = await User.where({username}).findOne()
        console.log(user);
        //if (!user || user.password !== password)
        if(!user || !(await bcrypt.compare(password, user.password))) {
            const error = new Error('unauthorized') //throwing error
            error.status = 401
            throw error
        }
        req.session.user = user
            res.status(201).json({
            message:'user logged in successfully',
            data: user
                })
        res.end()
    } catch (err) {
        next(err)
    }
}

exports.signup = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const saltRounds=10;
        const hashPassword = await bcrypt.hash(password, saltRounds)
        const newUser = new User({ username, password:hashPassword })
        const user = await newUser.save()
        req.session.user = user
        res.status(201).json({
            message:'user created',
            data: user
        })
        res.end()
    } catch (err) {
        if (err.name === 'databaseError' && err.code === 11000) { //11000 error code for mongo db 
            const userError  = new Error('username must be unique')
            userError .status = 412
            next(userError )
        } else next(err)
    }
}



