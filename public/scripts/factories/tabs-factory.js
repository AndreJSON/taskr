angular.module('app').factory('tabsFactory', function () {
	var data = {
		tabs: [
			{name: 'New task', file: 'new-task.html'}
		]
	}
	return data;
});