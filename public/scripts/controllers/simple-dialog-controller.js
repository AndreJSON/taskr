angular.module('app').controller('simpleDialogController', function ($scope, $mdDialog, title, text, options) {
	'use strict';
	
	$scope.title = title;
	$scope.text = text;
	$scope.options = options;

	$scope.closeWithValue = function (text) {
		$mdDialog.hide(text);
	}
});