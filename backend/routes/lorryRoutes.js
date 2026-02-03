const express = require('express');
const router = express.Router();
const lorryController = require('../controllers/lorryController');

router.post('/', lorryController.createLorry);
router.get('/', lorryController.getLorries);
router.put('/:id', lorryController.updateLorry);
router.delete('/:id', lorryController.deleteLorry);

module.exports = router;
