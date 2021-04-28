const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const { Schema } = mongoose

const connection = mongoose.createConnection('mongodb+srv://user1:Admin12@cluster0.rfjki.mongodb.net/shapeDatabse?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})

autoIncrement.initialize(connection)

const UserShapeSchema = new Schema({
    shapeId: {
        type: Number,
        unique: true,
        required: [true, 'Required Field'],
    },
    shape: {
        type: String,
        required: [true, 'Required Field'],
    },
    createdBy: {
        type: String,
        required: [true, ' Required Field'],
    },
    lastModifiedBy: {
        type: String,
        required: [true, 'Required Field'],
    },
},
{
    timestamps: {
        createdAt: true,
        updatedAt: true,
    },
})

UserShapeSchema.plugin(autoIncrement.plugin, {
    model: 'UserShape',
    field: 'shapeId',
    startAt: 1,
    incrementBy: 1,
})

module.exports = mongoose.model('UserShape', UserShapeSchema)
