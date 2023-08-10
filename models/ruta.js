const {Schema, model} = require('mongoose')

const rutaSchema = Schema({
    nombre:{
        type: String,
        required:[true, 'Campo nombre es obligatorio'],
    },
    centro:{
        type: Schema.Types.ObjectId,
        ref: 'centros',
        required: true
    },
    estado:{
        type: Boolean,
        required: true,
        default: true
    },
})

module.exports = model('rutas',rutaSchema)