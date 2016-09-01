angular.module('app').controller('mainController', function ($scope, $log, $http, $timeout) {
	'use strict';
	
	$scope.generalTasks = undefined;
	
	function getGeneralTasks() {
		$http.get('/general-tasks').then(
			function (res) {
				$scope.generalTasks = res.data.tasks;
			},
			function (err) {
				$log.info('Could not get greeting.');
			}
		);
	}
	
	function init() {
		getGeneralTasks();
	}
	
	$timeout(init);
});