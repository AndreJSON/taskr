'use strict';

var bodyParser = require('body-parser');
var tasks = require('./task-interface.js');

module.exports = function (app) {
	app.use(bodyParser.json());

	app.post('/new-activity', function (req, res) {
		tasks.addActivity(req.body);
		res.end();
	});

	app.post('/new-general-task', function (req, res) {
		tasks.addGeneralTask(req.body);
		res.end();
	});

	app.post('/new-date-task', function (req, res) {
		tasks.addDateTask(req.body);
		res.end();
	});

	app.get('/activities', function (req, res) {
		res.json(tasks.getActivities());
		res.end();
	});
	
	app.get('/general-tasks', function (req, res) {
		res.json(tasks.getGeneralTasks());
		res.end();
	});
};