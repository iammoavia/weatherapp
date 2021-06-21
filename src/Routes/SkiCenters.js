const {createSkiCenter,getAllSkicenters,getSkicenter,updateSkiCenters,deleteSkiCenters} = require('../Controllers/SkiCenters');
const express = require("express");
const router = express.Router();
router.use(express.json());
router.post('/create-skicenter',createSkiCenter);
router.get('/get-all-skicenters',getAllSkicenters);
router.get('/:id',getSkicenter);
router.delete('/:id',deleteSkiCenters);
router.patch('/:id',updateSkiCenters);
module.exports = router;