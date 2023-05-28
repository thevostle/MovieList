const User = require('../models/User');
const Movie = require('../models/Movie');

// Добавление просмотренного фильма с оценкой пользователю
const addWatchedMovie = async (req, res) => {
	try {
		const { userId, movieId, rating } = req.body;
		const user = await User.findById(userId);
		const movie = await Movie.findById(movieId);

		if (!user || !movie) {
			return res.status(404).json({ error: 'Пользователь или фильм не найдены' });
		}

		const watchedMovie = { movieId, rating };
		user.watchedMovies.push(watchedMovie);
		await user.save();

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: 'Не удалось добавить просмотренный фильм' });
	}
};

// Изменение оценки просмотренного фильма пользователем
const updateWatchedMovieRating = async (req, res) => {
	try {
		const { userId, movieId, rating } = req.body;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: 'Пользователь не найден' });
		}

		const watchedMovieIndex = user.watchedMovies.findIndex(
			(watchedMovie) => watchedMovie.movieId.toString() === movieId
		);

		if (watchedMovieIndex === -1) {
			return res.status(404).json({ error: 'Просмотренный фильм не найден' });
		}

		user.watchedMovies[watchedMovieIndex].rating = rating;
		await user.save();

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: 'Не удалось изменить оценку просмотренного фильма' });
	}
};

// Удаление просмотренного фильма пользователя
const removeWatchedMovie = async (req, res) => {
	try {
		const { userId, movieId } = req.body;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: 'Пользователь не найден' });
		}

		user.watchedMovies = user.watchedMovies.filter((watchedMovie) => watchedMovie.movieId.toString() !== movieId);
		await user.save();

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: 'Не удалось удалить просмотренный фильм' });
	}
};

module.exports = { addWatchedMovie, updateWatchedMovieRating, removeWatchedMovie };
