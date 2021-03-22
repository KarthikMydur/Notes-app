const mongoose = require('mongoose')


//Schema
const Schema = mongoose.Schema
const noteSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
    category : {
        type : Schema.Types.ObjectId,
        required : true,
        ref:'Category'
    },
    user : {
        type : Schema.Types.ObjectId
    },
    pinned : {
        type : Boolean,
        default : false
    },
    photo : {
        type : String
    },
    color : {
        type: String
    },
    reminder : {
        type : String
    },
    archived : {
        type : Boolean
    },
    deleted : {
        type : Boolean
    }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note