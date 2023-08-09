require('dotenv').config()

const Server = require('./conectionDB/server')

const server = new Server()

server.listen()