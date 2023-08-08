const { Router } = require('express')
const { check } = require('express-validator')
const { getRoles, postRoles, deleteRoles, patchRoles, getOneRoles } = require('../controllers/rol.controller')

const router = Router()

router.get('/',[],getRoles)
router.post('/',[],postRoles)
router.delete('/:id',[],deleteRoles)
router.patch('/:id',[],patchRoles)
router.get('/id',[],getOneRoles)

module.exports = router