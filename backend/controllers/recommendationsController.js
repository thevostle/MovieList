const User = require('../models/User');
const Movie = require('../models/Movie');

function findMostSimilarArrays(targetArray, arrays) {
	function calculateSimilarity(array1, array2) {
		let sum = 0;
		for (let i = 0; i < array1.length; i++) {
			const obj1 = array1[i];
			const obj2 = array2.find((obj) => obj.movieId === obj1.movieId);
			if (obj2) {
				sum += Math.pow(obj1.rating - obj2.rating, 2);
			}
		}
		return Math.sqrt(sum);
	}

	const sortedArrays = arrays.sort((a, b) => {
		const similarityA = calculateSimilarity(targetArray, a);
		const similarityB = calculateSimilarity(targetArray, b);
		return similarityA - similarityB;
	});

	return sortedArrays.slice(0, 5);
}

function filterAndAverage(array1, array2) {
	/*const filteredArray = array1.filter((item1) => !array2.some((item2) => item1._id === item2._id));

	const uniqueItems = filteredArray.reduce((accumulator, item) => {
		const existingItemIndex = accumulator.findIndex((accItem) => accItem._id === item._id);

		if (existingItemIndex !== -1) {
			const existingItem = accumulator[existingItemIndex];
			const sumRatings = existingItem.rating + item.rating;
			const countRatings = Number.isNaN(existingItem.rating) ? 1 : 2;
			const averageRating = sumRatings / countRatings;

			accumulator[existingItemIndex].rating = averageRating;
		} else {
			accumulator.push(item);
		}

		return accumulator;
	}, []);

	return uniqueItems;*/

	const result = [];
	for (item of array1) {
		for (arrayItem of item) {
			let flag = false;
			for (userItem of array2) {
				if (arrayItem.movieId.toString() == userItem.movieId.toString()) {
					flag = true;
				}
			} if (!flag) {
				result.push(arrayItem);
				break;
			}
		}
	}

	function calculateAverageValues(objects) {
		const idMap = new Map();

		objects.forEach((object) => {
			const { movieId, rating } = object;

			if (idMap.has(movieId.toString())) {
				const { sum, count } = idMap.get(movieId.toString());
				idMap.set(movieId.toString(), { sum: sum + rating, count: count + 1 });
			} else {
				idMap.set(movieId.toString(), { sum: rating, count: 1 });
			}
		});

		const averageValues = Array.from(idMap, ([movieId, { sum, count }]) => ({ movieId, rating: sum / count }));

		return averageValues;
	}

	console.log('t1', result)
    console.log('t2', calculateAverageValues(result));

	return calculateAverageValues(result); //.filter((v, i, a) => a.findIndex((v2) => v2.movieId === v.movieId) === i);
}

const getRecommendation = async (req, res) => {
	try {
		const { username } = req.params;
		const user = await User.findOne({ username: username });
		const allUsersExceptTarget = await User.find({ username: { $ne: username } });

		const userMoviesList = user.watchedMovies;

		let moviesListsOfAllUsers = [];
		for (someUser of allUsersExceptTarget) {
			if (someUser.watchedMovies.length != 0) {
				moviesListsOfAllUsers.push(someUser.watchedMovies);
			}
		}
		//console.log(moviesListsOfAllUsers);

		mostSimilarArrays = findMostSimilarArrays(userMoviesList, moviesListsOfAllUsers);
		//console.log('result', mostSimilarArrays);

		// TODO объединение нескольких массивов фильмов, которые user не смотрел
		let filteredMostSimilarArrays = filterAndAverage(mostSimilarArrays, userMoviesList);

		console.log('фильтрация', filteredMostSimilarArrays);

		//

		let resultMovies = [];
		for (i of filteredMostSimilarArrays) {
			resultMovies.push(await Movie.findOne({ _id: i.movieId }));
		}

		res.status(200).json(resultMovies);
	} catch (error) {
		res.status(500).json({ error: 'Не удалось получить данные пользователя' });
	}
};

module.exports = { getRecommendation };
