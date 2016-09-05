angular.module('app').factory('tasksFactory', function () {
	var data = {
		activities: [],
		generalTasks: []
	}
	return data;
});