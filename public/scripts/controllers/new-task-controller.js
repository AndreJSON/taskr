angular.module('app').controller('newTaskController', function ($scope, $log, $http, tasksFactory) {
	'use strict';
	
	$scope.tasksFactory = tasksFactory;
	$scope.input = {};

	$scope.submit = function () {
		if($scope.input.freetext === undefined) $scope.input.freetext = "";
		if($scope.input.deadline === undefined) $scope.input.deadline = false;
		if($scope.input.start === null) $scope.input.start = undefined;
		if($scope.input.start === undefined) {
			newGeneralTask();
		} else {
			$scope.input.date = formatDate($scope.input.start);
			$scope.input.time = formatTime($scope.input.time)
			newDateTask();
		}
	};

	function formatDate (d) {
		var str = "";
		str += d.getFullYear() + "-";
		str += ((d.getMonth()+1).toString().length === 1? "0" + d.getMonth() : d.getMonth()) + "-";
		str += (d.getDate().toString().length === 1? "0" + d.getDate() : d.getDate());
		return str;
	};

	function formatTime (t) {
		if(t === null || t === undefined || t === "")
			t = "00:00";
		return t;
	};

	function newGeneralTask () {
		$http.post('/new-general-task', $scope.input).then(
			function () {
				$log.info('Successfully posted general task.');
			},
			function () {
				$log.info('Error posting general task.');
			}
		);
	};

	function newDateTask () {
		$http.post('/new-date-task', $scope.input).then(
			function () {
				$log.info('Successfully posted date task.');
			},
			function () {
				$log.info('Error posting date task.');
			}
		);
	};
});