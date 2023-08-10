const bcryptjs = require('bcryptjs')
const { response } = require('express')
const Rutas = require('../models/ruta.js')

const getRUta = async(req, res = response)=>{
    const { ini, fini } = req.query;
    const query = { estado: true };

    const [ total, rutas ] = await Promise.all([
        Rutas.countDocuments(query),
        Rutas.find(query)
            .populate('centros', 'nombre')
            .skip( Number( ini ) )
            .limit(Number( fini ))
    ]);

    res.json({
        total: total,
        rutas: rutas,
    });
}

const getOneRUta = async(req, res = response)=>{

    const {id} = req.params

    const rutacito = await Rutas.findById(id)

    res.json(rutacito);
}

const postRUta = async (req,res = response) =>{

    const { id, ...body } = req.body;

    const rutaDb = await Rutas.findOne({ nombre: body.nombre });

    if ( rutaDb ) {
        return res.status(400).json({
            msg: `El ruta ${ rutaDb.nombre }, ya existe`
        });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
    }

    const rutaNew = new Rutas( data );

    await rutaNew.save();

    res.status(201).json(rutaNew);

}

const deleteRUta = async (req, res = response)=>{

    const {id} = req.params

    const ruta = await Rutas.findByIdAndUpdate( id, { estado: false } );

    res.json(ruta)
}

const patchRUta = async (req, res = response)=>{

    const { id } = req.params;

    const { _id, nombre,...resto } = req.body;

    if(nombre){
        resto.nombre = nombre.toUpperCase()
    }

    const ruta = await Rutas.findByIdAndUpdate( id, resto, {new:true} );

    res.json({
        msg:"ruta Actualizado correctamente",
        ruta : ruta
    });

}

module.exports = {
getRUta,
getOneRUta,
postRUta,
deleteRUta,
patchRUta,
}