const User = require('../models/User');

// Создание нового пользователя
const createUser = async (req, res) => {
	try {
		const { nickname, email, password } = req.body;
		const user = await User.create({ nickname, email, password });
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ error: 'Не удалось создать пользователя' });
	}
};

// Удаление пользователя
const deleteUser = async (req, res) => {
	try {
		const { userId } = req.params;
		await User.findByIdAndDelete(userId);
		res.status(200).json({ message: 'Пользователь удален' });
	} catch (error) {
		res.status(500).json({ error: 'Не удалось удалить пользователя' });
	}
};

// Изменение данных о пользователе
const updateUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const { nickname, email, password } = req.body;
		const updatedUser = await User.findByIdAndUpdate(userId, { nickname, email, password }, { new: true });
		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json({ error: 'Не удалось обновить данные пользователя' });
	}
};

// Чтение данных о пользователе
const getUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await User.findById(userId);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: 'Не удалось получить данные пользователя' });
	}
};

module.exports = { createUser, deleteUser, updateUser, getUser };
