const {Router} = require('express');

const {
    getAllTitulares,
    getTitular,
    getDatosTitulares,
    getAllTitularesToken,
    getAllDni
} = require('../controllers/titulares.controllers');

const router = Router();

//Trae todos los titulares
router.post('/alltitulares', getAllTitulares);

//trae un titular
router.post('/titular', getTitular);

//trae listados de titulares ordenados por dni, segun ingresan
router.post('/datostitular', getDatosTitulares);

//trae listado de titulares por TOKEN 
router.post('/lomtoken/:token', getAllTitularesToken);

//trae listado de titulares por DNI
router.post('/buscarDNI', getAllDni);

module.exports = router;
