const { Router } = require('express')
const { check } = require('express-validator')
const { getCentro, postCentro, deleteCentro, patchCentro, getOneCentro } = require('../controllers/centro.controller')

const router = Router()

router.get('/',[],getCentro)
router.post('/',[],postCentro)
router.delete('/:id',[],deleteCentro)
router.patch('/:id',[],patchCentro)
router.get('/:id',[],getOneCentro)

module.exports = router