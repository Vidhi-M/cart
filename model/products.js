const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
    productId:{
        type: Number,
        required : true,
    },
    productName :{
        type: String,
        required : true,
    },
    productCode : {
        type : String,
        required : true,
    },
    description:{
        type : String,
        required : true,
    },
    price:{
        type : Number,
        required : true,
    },
    rating:{
        type : Number,
        required : true,
    },
    manufacturer : {
        type : String,
        required: true,
    },
    osType: {
        type : String,
        reqired : true,
    }
},
    {
        timestamps:{
            createdAt: true,
            updatedAt : true,
        },
});

module.exports = mongoose.model('Products',productSchema);