const express = require('express');
const router = express.Router();

const {
	/*createUser,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
	findUserByName,*/
} = require('../controllers/userController');

/*router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// поиск пользователя
router.post('/users/findByName', findUserByName);*/

module.exports = router;
