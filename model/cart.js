const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const connection = mongoose.connection;
autoIncrement.initialize(connection);

const cartSchema = new Schema(
    {
    /*cartId:{
        type: Number,
        required : true,
    }, */
    username : {
        type: String,
        required : true,
    },
    productsInCart : {
        type : String,
        required : true,
    },
    statusOfCart:{
        type : String,
        required : true,
    },
},
    {
        timestamps:{
            createdAt: true,
            updatedAt : true,
        },
});

cartSchema.plugin(autoIncrement.plugin,{
    model:'cart',
    field: 'cartId',
    startAt: 100,
    incrementBy : 1
})

module.exports = mongoose.model('Carts',cartSchema);