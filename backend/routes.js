/*jslint node: true */
'use strict';

var bodyParser = require('body-parser');
var taskHandler = require('./task-handler.js');

module.exports = function (app) {
	app.use(bodyParser.json());
	
	app.get('/tasks-general', function (req, res) {
		res.json(taskHandler.getGeneralTasks());
		res.end();
	});
};