const {Schema, model} = require('mongoose')

const rolSchema = Schema({
    rol:{
        type:String,
        required:[true,'Campo rol es obligatorio']
    },
    estado:{
        type: Boolean,
        required: true,
        default: true
    },
})

module.exports = model('roles',rolSchema)