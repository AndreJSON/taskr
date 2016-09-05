angular.module('app').controller('newTaskController', function ($scope, tasksFactory) {
	'use strict';
	
	$scope.tasksFactory = tasksFactory;

	$scope.input = {};
});