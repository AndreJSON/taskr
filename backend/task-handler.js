/*jslint node: true */
'use strict';
var db = require('./database-handler.js');

var generalTasks = [];
db.query();

module.exports = {
	getGeneralTasks: function () {
		return {tasks: generalTasks};
	},
	
	addGeneralTask: function (task) {
		db.query(db.queries.addGeneralTask);
	}
};