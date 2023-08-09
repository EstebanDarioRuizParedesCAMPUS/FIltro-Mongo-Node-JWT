const { Router } = require('express')
const { check } = require('express-validator')

const router = Router()

const { inicioSesion } = require('../controllers/auth.controller.js')
const { validateDocuments } = require('../middleware/validate.documents.js')

router.post("/login",[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateDocuments
] , inicioSesion );

module.exports = router