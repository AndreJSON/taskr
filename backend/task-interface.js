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
	addDateTask: function (task) {
		db.query(db.queries.addDateTask(task));
	},
	getActivities: function () {
		return {activities: db.getActivities()};
	},
	getGeneralTasks: function () {
		return {tasks: db.getGeneralTasks()};
	},
	getDateTasks: function () {
		return {tasks: db.getDateTasks()};
	},
	hideTask: function (info) {
		db.query(db.queries.hideTask(info));
	},
	postponeTask: function (info) {
		db.query(db.queries.postponeTask(info));
	},
	doneDate: function (info) {
		db.query(db.queries.doneDate(info));
	},
	doneGeneral: function (info) {
		db.query(db.queries.doneGeneral(info));
	}
};