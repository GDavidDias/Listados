const {Router} = require('express');

const {
    getAllTitulares,
    getTitular,
} = require('../controllers/titulares.controllers');

const router = Router();

//Trae todos los titulares
router.post('/alltitulares', getAllTitulares);

//trae un titular
router.post('/titular', getTitular);


module.exports = router;
