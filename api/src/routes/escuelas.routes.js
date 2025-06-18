const {Router} = require('express');

const{
    getAllEscuelas
} = require('../controllers/escuelas.controllers');

const router = Router();

//Trae todas las escuelas
router.post('/allescuelas', getAllEscuelas);

module.exports = router;

