const {Schema, model} = require('mongoose')

const levelSchema = Schema({
    nombre:{
        type: String,
        required:[true, 'Campo nombre es obligatorio'],
    },
    ruta:{
        type: Schema.Types.ObjectId,
        ref: 'rutas',
        required: true
    },
    duracion:{
        type:String,
        required:[true,'Campo duracion es obligatorio']
    },
    estado:{
        type: Boolean,
        required: true,
        default: true
    },
})

module.exports = model('levels',levelSchema)