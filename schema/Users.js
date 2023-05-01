const mongoose = require('mongoose')
const { Schema } = mongoose

const UersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    task:[
        {
            name:{
                type: String
            },
            date:{
                type: String
            },
            isDone:{
                type: Boolean
            }
        }
    ]
})
module.exports = mongoose.model('users', UersSchema);