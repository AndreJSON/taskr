angular.module('app').filter('sameDayFilter', function () {
	return function (list, day) {
		if(day === undefined) return [];
		var output = [], counter = 0;
		for(counter = 0; counter < list.length; counter++) {
			if(list[counter].start.toString().substring(0,10) === day.toString().substring(0,10)) {
				output.push(list[counter]);
			}
		}
		return output;
	};
});