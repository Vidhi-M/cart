const cartModel = require('../model/cart')
const productModel = require('../model/products')

/* exports.viewAll = async(req,res)=>{
    try{
        const allCarts = await cartModel.find({createdBy : req.session.user});
        console.log(allCarts);
        res.status(201).send(allCarts);
    }catch(err){
        console.log(err);
        res.status(500).send('An error occured');
    }
} */

exports.viewByUsername = async(req,res)=>{
    try{
        const cart = await cartModel.findOne({username: req.body.username});
        res.status(200).send(cart);
    }catch(err){
        console.log(err);
        res.status(500).send('An error occured');
    }
}

 exports.create = async(req,res)=>{
    try{
        const username = req.session.user;
        const productsInCart = req.body.productsInCart;
        const newCart = await productModel.create({productId: productId,productName : productName,quantity: quantity})


         


    }catch(err){
        console.log(err);
        res.status(500).send('An error occured');
    }
}


exports.update = async(req,res)=>{
    try{

    }catch(err){
        console.log(err);
        res.status(500).send('An error occured');
    }
}

exports.delete = async(req,res)=>{
    try{

        const prodname = await productModel.findOne({productId:req.param.productId});
        const sesUser = req.session;
        const deleted = await productModel.findOneAndDelete({productId: req.param.productId});
        res.status(200).json({
            message :' Deleted',
            data : deleted, 
        })

    }catch(err){
        console.log(err);
        res.status(500).send('An error occured');
    }
} 