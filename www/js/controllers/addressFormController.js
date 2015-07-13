(function(){
	'use strict';

	angular.module('App.Controllers')
		.controller('AddressFormController', ['$scope', '$state',
			function($scope, $state) {
				var startSearch = function(){
					$state.go('atmlist', $scope.data);
				};

				$scope.data = {
					street: '',
					city: '',
					state: ''
				};

				$scope.submit = function(form) {
					if(form.$valid) {
						startSearch();
					}
				};
			}]);
}());
