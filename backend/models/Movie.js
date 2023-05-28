const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	genres: [
		{
			type: String,
			required: true,
		},
	],
	countries: [
		{
			type: String,
			required: true,
		},
	],
	releaseYear: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	ageRestriction: {
		type: Number,
		required: true,
	},
	userRating: {
		type: Number,
		default: 0,
	},
	aggregatorRating: {
		type: Number,
		default: 0,
	},
	studios: [
		{
			type: String,
		},
	],
	directors: [
		{
			type: String,
		},
	],
	episodeCount: {
		type: Number,
		default: 0,
	},
	seasonCount: {
		type: Number,
		default: 0,
	},
});

module.exports = mongoose.model('Movie', movieSchema);
