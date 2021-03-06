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
var activities = [];
var generalTasks = [];
var dateTasks = [];
var timeToNextUpdate = 0;
var timeBetweenUpdates = 2;
var timeBetweenChecks = 0.1;

function updateLoop () {
	if(timeToNextUpdate <= 0) {
		timeToNextUpdate = timeBetweenUpdates;
		query(queries.getActivities(), function (rows) {
			activities = rows;
		});
		query(queries.getGeneralTasks(), function (rows) {
			generalTasks = rows;
		});
		query(queries.getDateTasks(), function (rows) {
			dateTasks = rows;
		});
	}
	timeToNextUpdate -= timeBetweenChecks;
	setTimeout(updateLoop, timeBetweenChecks * 1000);
}

function formatString (str) {
	str = str.replace(/'/g, "''");
	return "'" + str + "'";
}

function query (str, callback) {
	pool.connect(function (err, client, done) {
		if (err) {
			return console.error('Error fetching client from pool: ', err);
		}
		client.query(str, function (err, result) {
			done(); //Release client back to pool.
			if (err) {
				return console.error('Error running query: ', err);
			}
			if(callback !== undefined) callback(result.rows);
		});
	});
}

var queries = {
	addActivity: function (activity) {
		return "INSERT INTO activities (name, freetext) VALUES(" +
		formatString(activity.name) + "," +
		formatString(activity.freetext) + ")";
	},
	addGeneralTask: function (task) {
		return "INSERT INTO general_tasks (activity_id,title,freetext,deadline,hidden_until) VALUES(" +
		task.activity + "," +
		formatString(task.title) + "," +
		formatString(task.freetext) + "," +
		task.deadline + "," +
		"now())";
	},
	addDateTask: function (task) {
		return "INSERT INTO date_tasks (activity_id,title,freetext,deadline,start) VALUES(" +
		task.activity + "," +
		formatString(task.title) + "," +
		formatString(task.freetext) + "," +
		task.deadline + "," +
		formatString(task.date + " " + task.time) + ")";
	},
	getActivities: function () {
		return "SELECT * FROM activities ORDER BY id ASC";
	},
	getGeneralTasks: function () {
		return "SELECT * FROM general_tasks WHERE done = false ORDER BY activity_id ASC";
	},
	getDateTasks: function () {
		return "SELECT * FROM date_tasks WHERE done = false ORDER BY start ASC";
	},
	hideTask: function (info) {
		return "UPDATE general_tasks SET hidden_until = now() + interval '"+info.hours+" hours' WHERE id = " + info.id;
	},
	postponeTask: function (info) {
		return "UPDATE date_tasks SET start = start + interval '"+info.hours+" hours' WHERE id = " + info.id;
	},
	doneDate: function (info) {
		return "UPDATE date_tasks SET done = true WHERE id = " + info.id;
	},
	doneGeneral: function (info) {
		return "UPDATE general_tasks SET done = true WHERE id = " + info.id;
	}
};

module.exports = {
	getActivities: function () {
		return activities;
	},
	getGeneralTasks: function () {
		return generalTasks;
	},
	getDateTasks: function () {
		return dateTasks;
	},
	query: query,
	queries: queries,
	init: function () {
		updateLoop();
	}
};