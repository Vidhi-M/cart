const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Shape = new Schema({
    shapeNumber:{
        type : Number,
        unique : true,
        required : [true, 'Required Field'],
    },
    shapeName :{
        type : String,
        unique : true,
        required :[true, 'Required Field'],
    },
},
{
    timestamps: {
        createdAt : true,
        updatedAt : true,
    },
})

module.exports=mongoose.model('Shape',Shape);