const express = require('express');

const shapeRouter = express.Router();
const shapeController = require('../controller/shapeController');

shapeRouter.post('/newShape',shapeController.newShape);
shapeRouter.get('/availableShapes',shapeController.availableShape);

module.exports=shapeRouter;
