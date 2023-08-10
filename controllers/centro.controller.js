const bcryptjs = require('bcryptjs')
const { response } = require('express')
const Centro = require('../models/centro.js')

const getCentro = async(req, res = response)=>{
    const { ini, fini } = req.query;
    const query = { estado: true };

    const [ total, centros ] = await Promise.all([
        Centro.countDocuments(query),
        Centro.find(query)
            .skip( Number( ini ) )
            .limit(Number( fini ))
    ]);

    res.json({
        total: total,
        centros: centros,
    });
}

const getOneCentro = async(req, res = response)=>{

    const {id} = req.params

    const centrocito = await Centro.findById(id)

    res.json(centrocito);
}

const postCentro = async (req,res = response) =>{

    const { id, estado, ...body } = req.body;

    const centroDb = await Centro.findOne({ nombre: body.nombre });

    if ( centroDb ) {
        return res.status(400).json({
            msg: `El centro ${ centroDb.nombre }, ya existe`
        });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
    }

    const centroNew = new Centro( data );

    await centroNew.save();

    res.status(201).json(centroNew);

}

const deleteCentro = async (req, res = response)=>{

    const {id} = req.params

    const centro = await Centro.findByIdAndUpdate( id, { estado: false } );

    res.json(centro)
}

const patchCentro = async (req, res = response)=>{

    const { id } = req.params;

    const { _id, nombre,...resto } = req.body;

    if(nombre){
        resto.nombre = nombre.toUpperCase()
    }

    const centro = await Centro.findByIdAndUpdate( id, resto, {new:true} );

    res.json({
        msg:"centro Actualizado correctamente",
        centro : centro
    });

}

module.exports = {
getCentro,
getOneCentro,
postCentro,
deleteCentro,
patchCentro,
}