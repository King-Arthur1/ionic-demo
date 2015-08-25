(function(){
	'use strict';

	angular.module('App.Controllers')
		.controller('AtmDetailController', ['$scope', '$state', 'AtmService', 'BingApiKey', 'LaunchNavigatorService', '$ionicPopup',
			function($scope, $state, AtmService, BingApiKey, LaunchNavigatorService, $ionicPopup){
				var atm = AtmService.getATMAt($state.params.index);

				var navigate = function(){
					LaunchNavigatorService
						.navigate([atm.Latitude, atm.Longitude], null)
						.catch(function(){
							$ionicPopup.alert({
								title: 'Error',
								template: 'Navigation is not supported on this platform.',
								okType: 'button-positive'
							})
					});
				};

				$scope.atm = atm;
				$scope.bingApiKey = BingApiKey;
				$scope.hasFeatures = (atm.Hours && atm.Hours !== '') || (atm.RetailInfo && atm.RetailInfo !== '') || atm.AcceptsDeposit === 'Y';
				$scope.navigate = navigate;
			}]);
}());
