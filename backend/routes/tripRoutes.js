const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

router.post('/', tripController.createTrip);
router.get('/', tripController.getTrips);
router.put('/:id', tripController.updateTrip);
router.put('/:id/pod', require('../middleware/upload').single('podImage'), tripController.updateTripPod);
router.delete('/:id', tripController.deleteTrip);

module.exports = router;
