const express = require('express')
const Shape = require('../model/Shape')


exports.newShape = async (req, res, next) => {
    try {
        const { shapeNumber, shapeName } = req.body
        const newShape = new Shape({ shapeNumber, shapeName })
        const shape = await newShape.save()
        res.status(201).json({
           status:'Success',
           message :'Shape created successfully',
           data : shape
        })
        res.end()
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:'shape exist with same shapeNumber or ShapeName'
        })
       /*  if (err.name === 'MongoError' && err.code === 11000) {
            const validationError = new Error('shape exist with same shapeNumber or ShapeName')
            validationError.status = 412
            next(validationError)
        } else next(err)
    } */
}}

exports.availableShape = async (req, res, next) => {
    try {
        const shapes = await Shape.find()

        res.status(201).json({
            status:"success",
            message:'retrieved all available shapes',
            data :shapes
        })
        res.end()
    } catch (err) {
        next(err)
    }
}
