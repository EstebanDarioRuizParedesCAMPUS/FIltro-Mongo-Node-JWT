const express = require('express')
const cors = require('cors')
const databaseCnx = require("./config.js");

class Server {
    constructor(){
        this.app = express()

        this.port = process.env.PORT

        this.path = {
            auth: '/api/auth',
            search: '/api/search',
            camper: '/api/camper',
            centro: '/api/centro',
            level: '/api/level',
            rol: '/api/rol',
            ruta: '/api/ruta',
        }

        this.conection()
        this.middleware()
        this.rutas()

    }

    middleware(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))

    }

    rutas(){
        //this.app.use(this.path.auth, require())
        //this.app.use(this.path.search, require())
        //this.app.use(this.path.camper, require())
        //this.app.use(this.path.centro, require())
        //this.app.use(this.path.level, require())
        //this.app.use(this.path.rol, require())
        //this.app.use(this.path.ruta, require())
        //this.app.use(this.path.auth, require())
    }

    async conection(){
        await databaseCnx()
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor conectado al puerto ${this.port}`);
        })
    }

}

module.exports = Server