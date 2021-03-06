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

	app.post('/hide-task', function (req, res) {
		tasks.hideTask(req.body);
		res.end();
	});

	app.post('/postpone-task', function (req, res) {
		tasks.postponeTask(req.body);
		res.end();
	});

	app.post('/done-date', function (req, res) {
		tasks.doneDate(req.body);
		res.end();
	});

	app.post('/done-general', function (req, res) {
		tasks.doneGeneral(req.body);
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

	app.get('/date-tasks', function (req, res) {
		res.json(tasks.getDateTasks());
		res.end();
	});
};