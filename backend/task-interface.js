/*jslint node: true */
'use strict';
var db = require('./database-handler.js');
db.init(); //Initialize auto updating of cache.

module.exports = {
	addActivity: function (activity) {
		db.query(db.queries.addActivity(activity));
	},
	addGeneralTask: function (task) {
		db.query(db.queries.addGeneralTask(task));
	},
	getActivities: function () {
		return {activities: db.getActivities()};
	},
	getGeneralTasks: function () {
		return {tasks: db.getGeneralTasks()};
	}
};