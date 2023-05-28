const Movie = require('../models/Movie');

// Создание нового фильма
const createMovie = async (req, res) => {
	try {
		const {
			title,
			description,
			genres,
			countries,
			releaseYear,
			image,
			ageRestriction,
			studios,
			directors,
			episodeCount,
			seasonCount,
		} = req.body;
		const movie = await Movie.create({
			title,
			description,
			genres,
			countries,
			releaseYear,
			image,
			ageRestriction,
			studios,
			directors,
			episodeCount,
			seasonCount,
		});
		res.status(201).json(movie);
	} catch (error) {
		res.status(500).json({ error: 'Не удалось создать фильм' });
	}
};

// Удаление фильма
const deleteMovie = async (req, res) => {
	try {
		const { movieId } = req.params;
		await Movie.findByIdAndDelete(movieId);
		res.status(200).json({ message: 'Фильм удален' });
	} catch (error) {
		res.status(500).json({ error: 'Не удалось удалить фильм' });
	}
};

// Изменение данных о фильме
const updateMovie = async (req, res) => {
	try {
		const { movieId } = req.params;
		const {
			title,
			description,
			genres,
			countries,
			releaseYear,
			image,
			ageRestriction,
			studios,
			directors,
			episodeCount,
			seasonCount,
		} = req.body;
		const updatedMovie = await Movie.findByIdAndUpdate(
			movieId,
			{
				title,
				description,
				genres,
				countries,
				releaseYear,
				image,
				ageRestriction,
				studios,
				directors,
				episodeCount,
				seasonCount,
			},
			{ new: true }
		);
		res.status(200).json(updatedMovie);
	} catch (error) {
		res.status(500).json({ error: 'Не удалось обновить данные фильма' });
	}
};

// Чтение данных о фильме
const getMovie = async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id);
		res.status(200).json(movie);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getAllMovies = async (req, res) => {
	try {
		const movie = await Movie.find();
		res.status(200).json(movie);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = { createMovie, deleteMovie, updateMovie, getMovie, getAllMovies };
