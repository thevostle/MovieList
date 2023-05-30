const express = require('express');
const router = express.Router();

const { createUser, getUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');

router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/:username', getUser);
router.put('/users/:username', updateUser);
router.delete('/users/:username', deleteUser);


module.exports = router;
