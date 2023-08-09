const mongoose = require('mongoose')

const databaseCnx = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Conecion exitosa");
    } catch (error) {
        console.log(error);
        throw new Error('No se puede conectar a la DB')
    }
}

module.exports = databaseCnx
