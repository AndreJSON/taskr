angular.module('app').factory('tasksFactory', function () {
	var data = {
		activities: [],
		getActivityByID: function (id) {
			var counter;
			for (counter = 0; counter < this.activities.length; counter ++) {
				if(this.activities[counter].id === id)
					return this.activities[counter];
			}
			return this.activities[0];
		},
		generalTasks: [],
		dateTasks: []
	}
	return data;
});