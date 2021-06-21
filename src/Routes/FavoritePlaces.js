const {createFavoritePlaces,getMyFavoritePlace,getFavoritePlace,deleteFavoritePlace} = require('../Controllers/FavoritePlaces');
const express = require("express");
const router = express.Router();
router.use(express.json());
router.post('/create-favorite-place/:userId',FavoritePlace.c);
router.get('/get-favorite-places/:userId',getMyFavoritePlace);
router.get('/:id',getFavoritePlace);
router.delete('/:id',deleteFavoritePlace);
module.exports = router;