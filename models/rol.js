const {Schema, model} = require('mongoose')

const rolSchema = Schema({
    rol:{
        type:String,
        required:[true,'Campo rol es obligatorio']
    },
})

module.exports = model('roles',rolSchema)