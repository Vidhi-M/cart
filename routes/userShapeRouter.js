const express = require('express');
const userShapeRouter = express.Router();

const userShapeController = require('../controller/userShapeController')

userShapeRouter.post('/create', userShapeController.create)
userShapeRouter.put('/update/:id', userShapeController.update)
userShapeRouter.delete('/delete/:id', userShapeController.del)
userShapeRouter.get('/view', userShapeController.view)
userShapeRouter.get('/view/:id', userShapeController.viewById)

module.exports = userShapeRouter