const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	watchedMovies: [
		{
			movieId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Movie',
				required: true,
			},
			rating: {
				type: Number,
				min: 1,
				max: 10,
				required: true,
			},
		},
	],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
