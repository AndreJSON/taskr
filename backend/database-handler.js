/*jslint node: true */
'use strict';
var pg = require('pg');
var config = {
	host: '/var/run/postgresql',
	user: 'postgres',
	password: "",
	database: 'taskr',
	port: 5432,
	max: 10,
	idleTimeoutMillis: 60000
};
var pool = new pg.Pool(config);

module.exports = {
	query: function () {
		pool.connect(function (err, client, done) {
			if (err) {
				return console.error('Error fetching client from pool: ', err);
			}
			client.query('SELECT $1::int AS number', ['1'], function (err, result) {
				done(); //Release client back to pool.
				if (err) {
					return console.error('Error running query: ', err);
				}
				console.log(result.rows[0].number);
			});
		});
	}
};