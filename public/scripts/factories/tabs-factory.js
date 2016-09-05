angular.module('app').factory('tabsFactory', function () {
	var data = {
		tabs: [
			{name: 'General', file: 'general-tasks.html'},
			{name: 'Schedule', file: 'schedule.html'},
			{name: 'New task', file: 'new-task.html'}
		]
	}
	return data;
});