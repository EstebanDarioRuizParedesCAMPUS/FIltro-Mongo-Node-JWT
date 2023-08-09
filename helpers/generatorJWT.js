const jwt = require('jsonwebtoken')

const generarJWT = (userId = '') =>{

    return new Promise((resolve,reject)=>{
        const payload = {userId}

        jwt.sign(payload, process.env.PRIVATE_KEY,{
            expiresIn: '2h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('Error al crear Token')
            } else {
                resolve(token)
            }
        })
    })
    
}

module.exports = {generarJWT}