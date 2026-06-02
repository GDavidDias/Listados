const {Router} = require('express');

const{
    getAllEscuelas,
    getEscuelaID
} = require('../controllers/escuelas.controllers');

const router = Router();

//Trae todas las escuelas
router.post('/allescuelas', getAllEscuelas);

//Trae escuela por ID
router.post('/escuelaid', getEscuelaID);

module.exports = router;

