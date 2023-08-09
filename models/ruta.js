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
})

module.exports = model('rutas',rutaSchema)