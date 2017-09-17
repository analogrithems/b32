var DBConfig = {
	client: 'mysql',
	connection: {
    host: 'localhost',
    user: 'radio',
    password: '1qaz@WSX',
    database: 'music',
		charset: 'utf8'
	}
};

var knex = require('knex')(DBConfig);
var bookshelf = require('bookshelf')(knex);

module.exports = {
  knex: knex,
  bookshelf: bookshelf
}
