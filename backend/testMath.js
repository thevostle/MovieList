/*
// Функция для вычисления косинусного сходства между двумя пользователями
function cosineSimilarity(userA, userB) {
	const commonMovies = userA.ratings.filter((ratingA) =>
		userB.ratings.some((ratingB) => ratingA.movieId === ratingB.movieId)
	);

	console.log(commonMovies)

	let dotProduct = 0;
	let normA = 0;
	let normB = 0;

	for (const ratingA of commonMovies) {
		const ratingB = userB.ratings.find((rating) => rating.movieId === ratingA.movieId);

		dotProduct += ratingA.rating * ratingB.rating;
		normA += ratingA.rating ** 2;
		normB += ratingB.rating ** 2;
	}

	normA = Math.sqrt(normA);
	normB = Math.sqrt(normB);

	return dotProduct / (normA * normB);
}

// Функция для нахождения похожего пользователя с помощью User-Based Collaborative Filtering
function findSimilarUser(targetUserId, users) {
	const targetUser = users.find((user) => user.id === targetUserId);

	// Если целевой пользователь не найден, вернуть ошибку или пустой результат
	if (!targetUser) {
		return null;
	}

	// Вычислить сходство с другими пользователями
	const similarities = users.map((user) => {
		if (user.id === targetUserId) {
			return 0; // Исключить целевого пользователя из сравнения
		}
		const similarity = cosineSimilarity(targetUser, user);
		return similarity;
	});

	// Найти индексы N пользователей с наибольшим сходством
	const topSimilarUsersIndexes = similarities
		.map((similarity, index) => ({ similarity, index }))
		.sort((a, b) => b.similarity - a.similarity)
		.slice(0, 5)
		.map((item) => item.index);

	// Получить список N похожих пользователей
	const similarUsers = topSimilarUsersIndexes.map((index) => users[index]);

	return similarUsers;
}

users = [
	{
		id: 1,
		ratings: [
			{
				id: 101,
				value: 5,
			},
			{
				id: 102,
				value: 7,
			},
			{
				id: 103,
				value: 1,
			},
		],
	},
	{
		id: 2,
		ratings: [
			{
				id: 101,
				value: 6,
			},
			{
				id: 102,
				value: 7,
			},
			{
				id: 103,
				value: 9,
			},
		],
	},
	{
		id: 3,
		ratings: [
			{
				id: 101,
				value: 5,
			},
			{
				id: 102,
				value: 6,
			},
			{
				id: 103,
				value: 8,
			},
		],
	},
	{
		id: 4,
		ratings: [
			{
				id: 101,
				value: 10,
			},
			{
				id: 102,
				value: 1,
			},
			{
				id: 103,
				value: 1,
			},
			{
				id: 104,
				value: 3,
			},
		],
	},
	{
		id: 5,
		ratings: [
			{
				id: 101,
				value: 5,
			},
			{
				id: 102,
				value: 7,
			},
			{
				id: 103,
				value: 2,
			},
		],
	},
	{
		id: 6,
		ratings: [
			{
				id: 101,
				value: 6,
			},
			{
				id: 102,
				value: 6,
			},
			{
				id: 103,
				value: 4,
			},
		],
	},
	{
		id: 7,
		ratings: [
			{
				id: 101,
				value: 5,
			},
			{
				id: 102,
				value: 6,
			},
			{
				id: 103,
				value: 1,
			},
		],
	},
	{
		id: 8,
		ratings: [
			{
				id: 101,
				value: 4,
			},
			{
				id: 102,
				value: 7,
			},
			{
				id: 103,
				value: 2,
			},
		],
	},
];

console.log(findSimilarUser(1, users));
*/










function findMostSimilarArrays(targetArray, arrays) {
	// Вычисление сходства массивов с помощью Евклидова расстояния
	function calculateSimilarity(array1, array2) {
		let sum = 0;
		for (let i = 0; i < array1.length; i++) {
			const obj1 = array1[i];
			const obj2 = array2.find((obj) => obj.id === obj1.id);
			if (obj2) {
				sum += Math.pow(obj1.value - obj2.value, 2);
			}
		}
		return Math.sqrt(sum);
	}


	// Сортировка массивов по сходству
	const sortedArrays = arrays.sort((a, b) => {
		const similarityA = calculateSimilarity(targetArray, a);
		const similarityB = calculateSimilarity(targetArray, b);
		return similarityA - similarityB;
	});

	// Возвращение трех наиболее похожих массивов
	return sortedArrays.slice(0, 3);
}

// Пример использования функции
const targetArray = [
	{ id: 1, value: 4 },
	{ id: 2, value: 15 },
	{ id: 4, value: 5 },
];

const arrays = [
	[
		{ id: 1, value: 70 },
		{ id: 2, value: 4 },
		{ id: 3, value: 9 },
	],
	[
		{ id: 1, value: 2 },
		{ id: 2, value: 6 },
		{ id: 3, value: 5 },
	],
	[
		{ id: 1, value: 3 },
		{ id: 2, value: 20 },
		{ id: 3, value: 7 },
		{ id: 4, value: 6 },
		{ id: 5, value: 3 },
		{ id: 6, value: 2 },
		{ id: 7, value: 2 },
		{ id: 8, value: 5 },
	],
	[
		{ id: 4, value: 6 },
		{ id: 5, value: 2 },
		{ id: 6, value: 7 },
	],
];

const mostSimilarArrays = findMostSimilarArrays(targetArray, arrays);
console.log(mostSimilarArrays);
