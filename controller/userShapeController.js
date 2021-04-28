const express = require('express')
const Shape = require('../model/Shape')
const UserShape = require('../model/UserShape')




exports.create = async (req, res, next) => {
    try {
        const { shapeNumber } = req.body
        const { username } = req.session.user
        const shape = await Shape.where({shapeNumber}).findOne()
        if (!shape) {
            const error = new Error('shape not found for given shapeNumber')
            error.status = 412
            throw error
        }
        const newUserShape = new UserShape({ shape: shape.shapeName, createdBy: username, lastModifiedBy: username })
        console.log(newUserShape);
        const userShape = await newUserShape.save()
        res.status(201).json({
            status:"success",
            message:'new shape created',
            data: userShape
        })
        res.end()
    } catch (err) {
        next(err)
    }
}

exports.view = async (req, res, next) => {
    try {
        const { username } = req.session.user
        const userShapes = await UserShape.find({ createdBy: username }, { lastModifiedBy: username })
        console.log(userShapes);
        res.status(201).json({
            status:'success',
            message :'retrieved all available shapes',
            data: userShapes
        })
        res.end()
    } catch (err) {
        next(err)
    }
}

exports.viewById = async (req, res, next) => {
    try {
        const { id } = req.params
        //id,10  converting shapeId to Integer by using parseInt
        const userShape = await UserShape.where({ shapeId: parseInt(id, 10) }).findOne()
        if (!userShape) {
            const error = new Error('user shape not found for given shapeId')
            error.status = 412
            throw error
        }
        res.status(201).json({
            message:'user shape retrieved',
            data: userShape
        })
        res.end()
    } catch (err) {
        next(err)
    }
}

exports.del = async (req, res, next) => {
    try {
        const { username } = req.session.user
        const { id } = req.params
        const userShape = await UserShape.where({ shapeId: parseInt(id, 10) }).findOne()
        if (!userShape) {
            const error = new Error('user shape not found for given shapeId')
            error.status = 412
            throw error
        }
        if (userShape.createdBy !== username || userShape.lastModifiedBy !== username) {
            const error = new Error(`you're not allowed to delete this shape`)
            error.status = 412
            throw error
        }
        await UserShape.deleteOne({ shapeId: id })
        res.status(201).json({
            message:'user shape deleted',
            data: userShape
        })
        res.end()
    } catch (err) {
        next(err)
    }
}

exports.update = async (req, res, next) => {
    try {
        const { username } = req.session.user
        const { id } = req.params
        const { shapeNumber } = req.body
        const shape = await Shape.where({ shapeNumber }).findOne()
        if (!shape) {
            const error = new Error('shape not found for given shapeNumber')
            error.status = 412
            throw error
        }
        await UserShape.updateOne({ shapeId: id }, { shape: shape.shapeName, lastModifiedBy: username })
        //parseInt shape id converting to integer
        
        const userShape = await UserShape.where({ shapeId: parseInt(id, 10) }).findOne()
        if (!userShape) {
            const error = new Error('user shape not found for given shapeId')
            error.status = 412
            throw error
        }
        res.status(201).json({
            message:'user shape updated',
            data: userShape
        })
        res.end()
    } catch (err) {
        next(err)
    }
}
