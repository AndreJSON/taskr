angular.module('app').factory('tabsFactory', function () {
	var data = {
		tabs: [
			{name: 'General', file: 'general-tasks.html'},
			{name: 'Schedule', file: 'schedule.html'},
			{name: 'New task', file: 'new-task.html'},
			{name: 'New Activity', file: 'new-activity.html'}
		]
	}
	return data;
});