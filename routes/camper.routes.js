const { Router } = require('express')
const { check } = require('express-validator')
const { getCamper, postCamper, deleteCamper, patchCamper, getOneCamper } = require('../controllers/camper.controller')

const router = Router()

router.get('/',[],getCamper)
router.post('/',[],postCamper)
router.delete('/:id',[],deleteCamper)
router.patch('/:id',[],patchCamper)
router.get('/:id',[],getOneCamper)

module.exports = router