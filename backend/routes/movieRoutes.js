const express = require('express');
const router = express.Router();

const { 
    createMovie, 
    getMovie,
    getAllMovies,
    updateMovie,
    deleteMovie,
} = require('../controllers/movieController');

router.post('/movies', createMovie)
router.get('/movies/:id', getMovie);
router.get('/movies', getAllMovies);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

/*router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// поиск пользователя
router.post('/users/findByName', findUserByName);*/

module.exports = router;
