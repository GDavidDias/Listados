const {Router} = require('express');

const {
    getAllTitulares,
} = require('../controllers/titulares.controllers');

const router = Router();

//Trae todos los titulares
router.post('/alltitulares', getAllTitulares);

module.exports = router;
