const bcryptjs = require('bcryptjs')
const { response } = require('express')
const Level = require('../models/level.js')

const getLevel = async(req, res = response)=>{
    const { ini, fini } = req.query;
    const query = { estado: true };

    const [ total, levels ] = await Promise.all([
        Level.countDocuments(query),
        Level.find(query)
            .populate('rutas', 'nombre')
            .skip( Number( ini ) )
            .limit(Number( fini ))
    ]);

    res.json({
        total: total,
        levels: levels,
    });
}

const getOneLevel = async(req, res = response)=>{

    const {id} = req.params

    const levelcito = await Level.findById(id)

    res.json(levelcito);
}

const postLevel = async (req,res = response) =>{

    const { id, ...body } = req.body;

    const levelDb = await Level.findOne({ nombre: body.nombre });

    if ( levelDb ) {
        return res.status(400).json({
            msg: `El level ${ levelDb.nombre }, ya existe`
        });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
    }

    const levelNew = new Level( data );

    await levelNew.save();

    res.status(201).json(levelNew);

}

const deleteLevel = async (req, res = response)=>{

    const {id} = req.params

    const level = await Level.findByIdAndUpdate( id, { estado: false } );

    res.json(level)
}

const patchLevel = async (req, res = response)=>{

    const { id } = req.params;

    const { _id, nombre,...resto } = req.body;

    if(nombre){
        resto.nombre = nombre.toUpperCase()
    }

    const level = await Level.findByIdAndUpdate( id, resto, {new:true} );

    res.json({
        msg:"level Actualizado correctamente",
        level : level
    });

}

module.exports = {
getLevel,
getOneLevel,
postLevel,
deleteLevel,
patchLevel,
}