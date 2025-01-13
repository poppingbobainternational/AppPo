const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const inventoryConfigController = require('../controllers/inventoryConfigController'); // Asegúrate de que esta línea esté presente

router.get('/', inventoryController.showInventory);
router.get('/total/Perlas', inventoryController.showTotalInventory);
router.get('/producto/perlas', inventoryController.showTotalInv);

router.get('/total/popping', inventoryController.showTotalInventory);
router.get('/producto/popping', inventoryController.showTotalInv);

router.get('/total/flavor', inventoryController.showTotalInventory);
router.get('/producto/flavor', inventoryController.showTotalInv);


router.get('/conteo', inventoryController.showInventoryCount);

// Rutas para configuración de inventario de producto
//router.get('/configuracion', inventoryConfigController.showInventoryConfig); // Página de configuración de inventario
//router.post('/configuracion/guardar', inventoryConfigController.saveInventoryConfig); // Guardar configuración en Firebase
//router.get('/configuracion/opciones', inventoryConfigController.getOptionsFromFirebase); // Obtener opciones de Firebase

module.exports = router;
