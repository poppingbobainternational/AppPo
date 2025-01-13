const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Ruta para obtener el perfil
router.get('/', profileController.getProfile);

// Ruta para guardar el perfil
router.post('/save', profileController.saveProfile);

module.exports = router;
