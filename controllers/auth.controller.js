const { response } = require('express')
const bcryptjs = require('bcryptjs')
const Camper = require('../models/camper.js')
const { generarJWT } = require('../helpers/generatorJWT')

const inicioSesion = async (req, res = response) =>{ 
    const {email, password} = req.body
    try {
        const camper = await Camper.findOne({email})

        if(!camper){
            return res.status(404).json({
                msg:'Camper no existe'
            })
        }

        if(!camper.estado){
            return res.status(400).json({
                msg:'Se debe seleccionar un camper activo'
            })
        }

        if(!password){
            return res.status(400).json({
                msg:'Es obligatorio ingresar una contraseña'
            })
        }

        const validadorPassword = bcryptjs.compareSync(password, camper.password)

        if(!validadorPassword){
            return res.status(400).json({
                msg:'EsLa contraseña ingresada es incorrecta'
            })
        }

        const token = await generarJWT(camper.id)

        res.json({
            camper,
            token
        })

    } catch (error) {
        console.log(error);
        return res.json({
            msg: 'No se ha podido inicar sesión'
        })
    }
}

module.exports = {
    inicioSesion
}