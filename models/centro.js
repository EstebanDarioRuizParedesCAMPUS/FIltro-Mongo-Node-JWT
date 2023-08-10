const {Schema, model} = require('mongoose')

const centroSchema = Schema({
    nombre:{
        type: String,
        required:[true, 'Campo nombre es obligatorio'],
    },
    descipcion:{
        type:String,
        required:[true,'Campo descripción es obligatorio']
    },
    ciudad:{
        type:String,
        required:[true,'Campo ciudad es obligatorio']
    },
    estado:{
        type: Boolean,
        required: true,
        default: true
    },
})

module.exports = model('centros',centroSchema)