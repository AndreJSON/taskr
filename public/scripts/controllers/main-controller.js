angular.module('app').controller('mainController', function ($scope, $log, $http, $timeout, $mdDialog, tabsFactory, tasksFactory) {
	'use strict';
	
	$scope.tabsFactory = tabsFactory;
	$scope.tasksFactory = tasksFactory;
	$scope.input = {};
	$scope.today = new Date();
	$scope.offsetWeeks = 0;
	$scope.viewedDays = [];
	$scope.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	$scope.hide = function (task) {
		var t = {}
		t.id = task.id;
		t.hours = 24 - task.hidden_until.getHours();
		$http.post('/hide-task', t).then(
			function (res) {
				$log.info("Successfully hid task.")
			},
			function (err) {
				$log.info("Could not hide task.");
			})
	};

	$scope.showDoneDialog = function (task, ev) {
		var dialog = $mdDialog.confirm()
			.title('Confirmation')
			.textContent('Really delete it?')
			.ariaLabel('Delete swag')
			.ok('Yes')
			.cancel('No!')
			.targetEvent(ev)

		$mdDialog.show(dialog).then(
			function () {
				done(task.id);
			},
			function () {
				$log.info("Did not delete task.");
			}
		);
	};

	$scope.changeWeek = function (amount) {
		$scope.offsetWeeks += amount;
		$scope.viewedDays = setViewedDays();
	};

	function done(id) {
		$http.post('/done-general', {id: id}).then(
			function (res) {
				$log.info('Successfully marked task as done.')
			},
			function (err) {
				$log.info('Could not mark task as done.');
			}
		);
	};

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
				var counter;
				for (counter = 0; counter < res.data.tasks.length; counter ++) {
					res.data.tasks[counter].hidden_until = createDate(res.data.tasks[counter].hidden_until);
				}
				$scope.tasksFactory.generalTasks = res.data.tasks;
			},
			function (err) {
				$log.info('Could not get tasks.');
			}
		);
	}

	function createDate(str) {
		var output = new Date();
		output.setFullYear(parseInt(str.substring(0,4)));
		output.setMonth(parseInt(str.substring(5,7))-1);
		output.setDate(parseInt(str.substring(8,10)));
		output.setUTCHours(parseInt(str.substring(11,13))); //Ta hänsyn till GMT?
		output.setMinutes(parseInt(str.substring(14,16)));
		return output;
	};

	function getDateTasks () {
		$http.get('/date-tasks').then(
			function (res) {
				var counter;
				for (counter = 0; counter < res.data.tasks.length; counter ++) {
					res.data.tasks[counter].start = createDate(res.data.tasks[counter].start);
				}
				$scope.tasksFactory.dateTasks = res.data.tasks;
			},
			function (err) {
				$log.info('Could not get tasks.');
			}
		);
	}

	function setViewedDays() {
		var counter, output = [], millisInDay = 24*60*60*1000;
		for(counter = 0; counter < 7; counter ++) {
			let date = new Date();
			date.setTime($scope.today.getTime() + $scope.offsetWeeks * millisInDay * 7 - ($scope.today.getDay() - counter) * millisInDay );
			output.push(date);
		}
		return output;
	}
	
	function init() {
		$scope.viewedDays = setViewedDays();
		getActivities();
		getGeneralTasks();
		getDateTasks();
	}
	
	$timeout(init);
});