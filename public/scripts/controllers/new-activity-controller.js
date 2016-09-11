angular.module('app').controller('newActivityController', function ($scope, $log, $http, tasksFactory) {
	'use strict';
	
	$scope.tasksFactory = tasksFactory;
	$scope.input = {};

	$scope.submit = function () {
		if($scope.input.freetext === undefined) $scope.input.freetext = "";
		newActivity();
		$scope.input = undefined;
	};

	function newActivity () {
		$http.post('/new-activity', $scope.input).then(
			function () {
				$log.info('Successfully posted activity.');
			},
			function () {
				$log.info('Error posting activity.');
			}
		);
	};
});