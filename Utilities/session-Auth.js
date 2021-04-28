var express = require('express');

const sessionAuth = (req, res, next) =>{
    try{
      const user = req.session.user;
      if(!user)
      {
        res.status(401).send("Please log into your user");
      }else next();
    }catch(err)
    {
      console.log(err);
      next();
    }
   
  }

  module.exports = sessionAuth;