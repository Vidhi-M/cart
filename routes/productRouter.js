const express = require('express');
const productRouter = express.Router();
const productController = require('../controller/productController');

productRouter.post('/tablets',productController.createtab);
productRouter.get('/tablets',productController.viewAll);
productRouter.get('/mobiles',productController.viewAll);
productRouter.post('./mobiles',productController.createmob);

cartRouter.all('*',invalid);
async function invalid(req,res){   // sends 404 back to user if any url is not found 
    res.send(404).json({
        message : 'Resource not found'
    })
}

module.exports= productRouter;