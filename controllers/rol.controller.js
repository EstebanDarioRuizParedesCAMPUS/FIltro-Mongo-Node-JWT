const bcryptjs = require('bcryptjs')
const { response } = require('express')
const Roles = require('../models/rol.js')

const getRoles = async(req, res = response)=>{
    const { ini, fini } = req.query;
    const query = { estado: true };

    const [ total, roles ] = await Promise.all([
        Roles.countDocuments(query),
        Roles.find(query)
            .skip( Number( ini ) )
            .limit(Number( fini ))
    ]);

    res.json({
        total: total,
        roles: roles,
    });
}

const getOneRoles = async(req, res = response)=>{

    const {id} = req.params

    const rolecito = await Roles.findById(id)

    res.json(rolecito);
}

const postRoles = async (req,res = response) =>{

    const { id, ...body } = req.body;

    const roleDb = await Roles.findOne({ rol: body.rol });

    if ( roleDb ) {
        return res.status(400).json({
            msg: `El role ${ roleDb.rol }, ya existe`
        });
    }

    const data = {
        ...body,
        rol: body.rol.toUpperCase(),
    }

    const roleNew = new Roles( data );

    await roleNew.save();

    res.status(201).json(roleNew);

}

const deleteRoles = async (req, res = response)=>{

    const {id} = req.params

    const role = await Roles.findByIdAndUpdate( id, { estado: false } );

    res.json(role)
}

const patchRoles = async (req, res = response)=>{

    const { id } = req.params;

    const { _id, rol,...resto } = req.body;

    if(rol){
        resto.rol = rol.toUpperCase()
    }

    const role = await Roles.findByIdAndUpdate( id, resto, {new:true} );

    res.json({
        msg:"role Actualizado correctamente",
        role : role
    });

}

module.exports = {
getRoles,
getOneRoles,
postRoles,
deleteRoles,
patchRoles,
}