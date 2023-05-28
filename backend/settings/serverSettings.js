const port = process.env.PORT ?? 27017;
const db_host = 'localhost';
const db_name = 'movieMate_DB';

module.exports = {
	port: port,
	db_host: db_host,
	db_name: db_name,
};
