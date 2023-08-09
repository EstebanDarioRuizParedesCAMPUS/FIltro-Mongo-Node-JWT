const {Schema, model} = require('mongoose')

const camperSchema = Schema({
    nombre:{
        type: String,
        required:[true, 'Campo nombre es obligatorio'],
    },
    tipoId:{
        type: String,
        required: true,
        enum: ['T.I', 'C.C']
    },
    nroId:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:[true,'Campo email es obligatorio']
    },
    password:{
        type:String,
        required:[true,'Campo Password es obligatorio']
    },
    level:{
        type: Schema.Types.ObjectId,
        ref: 'levels',
        required: true
    },
    levelState:{
        type: String,
        required: true,
        enum: ['FINALIZADO', 'PENDIENTE'],
        default: 'PENDIENTE',
    },
    estado:{
        type: Boolean,
        required: true,
        default: true
    },
    imagen:{
        type: String,
    },
    rol:{
        type: Schema.Types.ObjectId,
        ref: 'roles',
        required: true
    },
    promedio:{
        type:Number,
    },
})

module.exports = model('campers',camperSchema)