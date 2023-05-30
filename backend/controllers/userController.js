const User = require('../models/User');

// Создание нового пользователя
const createUser = async (req, res) => {
	try {
		const { username } = req.body;
		let user = await User.findOne({ username: username });
		if (!user) {
			user = await User.create({ username });
		}

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
		const { username } = req.body;
		const updatedUser = await User.findByIdAndUpdate(userId, { username }, { new: true });
		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json({ error: 'Не удалось обновить данные пользователя' });
	}
};

// Чтение данных о пользователе
const getUser = async (req, res) => {
	try {
		const { username } = req.params;
		const user = await User.findOne({username: username});
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: 'Не удалось получить данные пользователя' });
	}
};

const getAllUsers = async (req, res) => {
	try {
		const user = await User.find();
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

module.exports = { createUser, deleteUser, updateUser, getUser, getAllUsers };
