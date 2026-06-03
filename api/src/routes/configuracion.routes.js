const {Router} = require('express');

const{
    getConfiguracionNivel
} = require('../controllers/configuracion.controllers');

const router = Router();

//Trae configuracion por nivel
router.get('/configuracionnivel', getConfiguracionNivel);

module.exports = router;