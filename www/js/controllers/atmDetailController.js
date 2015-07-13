(function(){
	'use strict';

	angular.module('App.Controllers')
		.controller('AtmDetailController', ['$scope', '$state', 'AtmService', 'BingApiKey', 'LaunchNavigatorService',
			function($scope, $state, AtmService, BingApiKey, LaunchNavigatorService){
				var atm = AtmService.getATMAt($state.params.index);

				var navigate = function(){
					LaunchNavigatorService.navigate([atm.Latitude, atm.Longitude], null);
				};

				$scope.atm = atm;
				$scope.bingApiKey = BingApiKey;
				$scope.hasFeatures = (atm.Hours && atm.Hours !== '') || (atm.RetailInfo && atm.RetailInfo !== '') || atm.AcceptsDeposit === 'Y';
				$scope.navigate = navigate;
			}]);
}());
