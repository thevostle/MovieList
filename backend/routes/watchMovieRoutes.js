const express = require('express');
const router = express.Router();

const {
	addWatchedMovie,
	updateWatchedMovieRating,
	removeWatchedMovie,
	getWatchedMovies,
	getMovieRating,
} = require('../controllers/watchMovieController');

router.get('/watch/:username', getWatchedMovies);
router.get('/watch/:username/:movieId', getMovieRating);
router.post('/watch/:username/:movieId/:rating', addWatchedMovie);
router.put('/watch/:username/:movieId/:rating', updateWatchedMovieRating);
router.delete('/watch/:username/:movieId/', removeWatchedMovie);

module.exports = router;
