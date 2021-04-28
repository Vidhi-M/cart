const userModel = require('../model/users');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const validator = require('../Utilities/validator');
const SESS_NAME ='user';

exports.signup = async(req,res) => {
    const userName = req.body.username;
    const pass = req.body.password;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;

    //Check username & password to make sure the match conditions:
    try{
        const existingUser = await userModel.findOne({username:userName});
        console.log(`Found user? ${existingUser}`);
        if(existingUser == null)
        {
            const createdUser = await userModel.create({username:userName,password:pass,phoneNumber:phoneNumber,email:email});
            res.status(201).json({
                status:'success',
                message:`User Registered successfully: ${createdUser.username}`,
                data: createdUser,

            });   
        }
        else{
            console.log(`User already exists with Username ${userName}`);
            res.status(400).json({
                status:'fail',
                message:`User already exists with Username ${userName}, please try again with a different username.`
            });
        }
    }catch(err)
    {
        console.log(err);
        res.status(500).json({
            message:`An error has occured: ${err}`
        });
    }
}


exports.login = async(req,res) => {
    const user = req.body.username;
    const pass = req.body.password;
    try{      
        const existingUser = await userModel.findOne({username:user});
        if(existingUser)
        {
            const match = await bcrypt.compare(pass,existingUser.password);
            //Check to see if user is already logged in using session.
            if(req.session.user == user)
            {
                res.status(200).json({
                message:`You're already logged in!`
                });
            }
            else{
                if(match)
                {
                    req.session.user = existingUser;
                    res.status(200).json({
                    message:"True You've been signed in!",
                    data :existingUser,
                    });
                }      
            }
        }
        else{
            res.status(401).json({
                message:"False Username/password is incorrect"
            })
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message:`An error has occured: ${err}`
        });
    }
    
}

exports.logout = async (req,res) => {
    const user = req.session.user;
    if(user)
    {
        req.session.destroy((err)=>{
            res.clearCookie(SESS_NAME);
        })
        res.status(200).json({
            meessage :'successfully logged out',
            data : user
        })
    }else{
        res.status(400).send("You're not logged in!");
    }
}