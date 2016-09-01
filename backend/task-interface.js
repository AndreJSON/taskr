/*jslint node: true */
'use strict';
var db = require('./database-handler.js');
db.init(); //Initialize auto updating of cache.

module.exports = {
	getGeneralTasks: function () {
		return {tasks: db.getGeneralTasks};
	},
	
	addGeneralTask: function (task) {
		db.query(db.queries.addGeneralTask(task));
	}
};