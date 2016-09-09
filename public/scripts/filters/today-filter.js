angular.module('app').filter('todayFilter', function () {
	return function (list, showHidden) {
		if(showHidden) return list;
		var output = [], counter = 0, now = new Date();
		for(counter = 0; counter < list.length; counter++) {
			console.log(now.toString());
			if(list[counter].hidden_until < now.toString()) {
				output.push(list[counter]);
			}
		}
		return output;
	};
});