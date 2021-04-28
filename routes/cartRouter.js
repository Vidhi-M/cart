const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controller/cartController');

//cartRouter.post('/carts',cartController.create);
//cartRouter.get('/carts',cartController.viewAll);
cartRouter.get('/carts/:username',cartController.viewByUsername);
//cartRouter.put('./carts/:username',cartController.update);
//cartRouter.delete('./products/:productName',cartController.delete);

cartRouter.all('*',invalid);
async function invalid(req,res){   // sends 404 back to user if any url is not found 
    res.send(404).json({
        message : 'Resource not found'
    })
}

module.exports= cartRouter;