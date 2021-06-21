const AirportRoute = require('../Controllers/Airports');
const express = require("express");
const router = express.Router();
router.use(express.json());
router.post('/create-airport',AirportRoute.createAirport);
router.get('/get-all-airports',AirportRoute.getAllAirports);
router.get('/:id',AirportRoute.getAirport);
router.delete('/:id',AirportRoute.deleteAirport);
router.patch('/:id',AirportRoute.updateAnAirport);
module.exports = router;