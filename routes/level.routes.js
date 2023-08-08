const { Router } = require('express')
const { check } = require('express-validator')
const { getLevel, postLevel, deleteLevel, patchLevel, getOneLevel } = require('../controllers/level.controller')


const router = Router()

router.get('/',[],getLevel)
router.post('/',[],postLevel)
router.delete('/:id',[],deleteLevel)
router.patch('/:id',[],patchLevel)
router.get('/:id',[],getOneLevel)

module.exports = router