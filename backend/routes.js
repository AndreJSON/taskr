'use strict';

var bodyParser = require('body-parser');
var tasks = require('./task-interface.js');

module.exports = function (app) {
	app.use(bodyParser.json());

	app.post('new-general-task', function (req, res) {
		tasks.addGeneralTask(req.body);
		res.end();
	})
	
	app.get('/general-tasks', function (req, res) {
		res.json(tasks.getGeneralTasks());
		res.end();
	});
};