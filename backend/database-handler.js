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
var generalTasks = [];
var timeToNextUpdate = 0;
var timeBetweenUpdates = 5;
var timeBetweenChecks = 0.1;

function updateLoop () {
	if(timeToNextUpdate <= 0) {
		timeToNextUpdate = timeBetweenUpdates;
		query(queries.getGeneralTasks());
	}
	timeToNextUpdate -= timeBetweenChecks;
	setTimeout(updateLoop, timeBetweenChecks * 1000);
}

function formatString (str) {
	str = str.replace(/'/g, "''");
	return "'" + str + "'";
}

function query (str) {
	pool.connect(function (err, client, done) {
		if (err) {
			return console.error('Error fetching client from pool: ', err);
		}
		client.query(str, function (err, result) {
			done(); //Release client back to pool.
			if (err) {
				return console.error('Error running query: ', err);
			}
			console.log(result.rows);
		});
	});
}

var queries = {
	addGeneralTask: function (task) {
		return "INSERT INTO general_tasks (activity,title,freetext,start,stop,deadline) VALUES(" +
		formatString(task.activity) + "," +
		formatString(task.title) + "," +
		formatString(task.freetext) + "," +
		task.start + "," +
		task.stop + "," +
		task.deadline + ")"
	},
	getGeneralTasks: function () {
		return "SELECT * FROM general_tasks";
	}
}

module.exports = {
	getGeneralTasks: function () {
		return generalTasks;
	},
	query: query,
	queries: queries,
	init: function () {
		updateLoop();
	}
};