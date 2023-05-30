const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { port, db_host, db_name } = require('./settings/serverSettings.js');

const app = express();

// Подключение к базе данных MongoDB
mongoose.connect(`mongodb://${db_host}/${db_name}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
	console.log('Successfully connected to MongoDB');
});

// Разрешаем CORS-запросы для всех источников
app.use(cors());

// Парсим JSON-запросы
app.use(express.json());

// Импортируем маршруты
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const watchMovieRoutes = require('./routes/watchMovieRoutes');

// Используем маршруты
app.use('/api', userRoutes);
app.use('/api', movieRoutes);
app.use('/api', watchMovieRoutes);

// Обработка ошибок
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something went wrong!');
});

app.get('/', function (request, response) {
	// отправляем ответ
	response.send('<h2>Привет Express!</h2>');
});

// Запуск сервера
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
