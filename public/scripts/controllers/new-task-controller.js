angular.module('app').controller('newTaskController', function ($scope, $log, tasksFactory) {
	'use strict';
	
	$scope.tasksFactory = tasksFactory;
	$scope.input = {};

	$scope.submit = function () {
		if($scope.input.freetext === undefined) $scope.input.freetext = "";
		if($scope.input.deadline === undefined) $scope.input.deadline = false;
		if($scope.input.start === null) $scope.input.start = undefined;
		if($scope.input.stop === null) $scope.input.stop = undefined;
		if($scope.input.start === undefined) {
			$scope.newGeneralTask();
		} else {
			$scope.newDateTask();
		}
	};
});