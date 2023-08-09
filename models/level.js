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
})

module.exports = model('levels',levelSchema)