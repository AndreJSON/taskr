angular.module('app').controller('mainController', function ($scope, $log, $http, $timeout, tabsFactory, tasksFactory) {
	'use strict';
	
	$scope.tabsFactory = tabsFactory;
	$scope.tasksFactory = tasksFactory;

	function getActivities () {
		$http.get('/activities').then(
			function (res) {
				$scope.tasksFactory.activities = res.data.activities;
			},
			function (err) {
				$log.info('Could not get activities.');
			}
		);
	}
	
	function getGeneralTasks () {
		$http.get('/general-tasks').then(
			function (res) {
				$scope.tasksFactory.generalTasks = res.data.tasks;
			},
			function (err) {
				$log.info('Could not get tasks.');
			}
		);
	}
	
	function init() {
		getActivities();
		getGeneralTasks();
	}
	
	$timeout(init);
});