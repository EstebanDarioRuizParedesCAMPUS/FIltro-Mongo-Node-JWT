const bcryptjs = require('bcryptjs')
const  { response } = require('express')
const Camper = require('../models/camper.js')

const getCamper = async(req, res = response)=>{
    const { ini, fini } = req.query;
    const query = { estado: true };

    const [ total, campers ] = await Promise.all([
        Camper.countDocuments(query),
        Camper.find(query)
            .populate('levels', 'nombre')
            .populate('roles', 'rol')
            .skip( Number( ini ) )
            .limit(Number( fini ))
    ]);

    res.json({
        total: total,
        campers: campers,
    });
}

const getOneCamper = async(req, res = response)=>{

    const {id} = req.params

    const campercito = await Camper.findById(id)

    res.json(campercito);
}

const postCamper = async (req,res = response) =>{

    const {nombre,tipoId,nroId,email,password,level,levelState,rol,promedio} = req.body;

    const camper = new Camper({nombre,tipoId,nroId,email,password,level,levelState,rol,promedio});

    const salt = bcryptjs.genSaltSync();
    camper.password = bcryptjs.hashSync(password, salt);
    
    await camper.save();
    res.json({
        msg:'Camper guardado con éxito',
        camper: camper,
    })
}

const deleteCamper = async (req, res = response)=>{

    const {id} = req.params

    const camper = await Camper.findByIdAndUpdate( id, { estado: false } );

    res.json(camper)
}

const patchCamper = async (req, res = response)=>{

    const { id } = req.params;

    const { _id, password, estado, nroId, ...resto } = req.body;

    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const camper = await Camper.findByIdAndUpdate( id, resto, {new:true} );

    res.json({
        msg:"Camper Actualizado correctamente",
        camper : camper
    });

}

module.exports = {
getCamper,
getOneCamper,
postCamper,
deleteCamper,
patchCamper,
}