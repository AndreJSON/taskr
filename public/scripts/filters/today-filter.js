angular.module('app').filter('todayFilter', function () {
	return function (list, showHidden) {
		if(showHidden) return list;
		var output = [], counter = 0, now = new Date();
		for(counter = 0; counter < list.length; counter++) {
			if(list[counter].hidden_until.getTime() < now.getTime()) {
				output.push(list[counter]);
			}
		}
		return output;
	};
});