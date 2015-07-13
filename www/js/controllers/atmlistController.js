(function(){
	'use strict';

	angular.module('App.Controllers')
		.controller('AtmListController', ['$scope', '$state', '$ionicPopup', '$ionicLoading', '$ionicHistory', '_', 'GeoLocationService', 'AtmService', 'BingApiKey',
			function($scope, $state, $ionicPopup, $ionicLoading, $ionicHistory, _, GeoLocationService, AtmService, BingApiKey) {
				var locationPins = [];

				var displayErrorMessage = function(message){
					$ionicPopup.alert({
						title: 'Error',
						template: message,
						okType: 'button-positive'
					}).then(function(){
						$ionicHistory.goBack();
					});
				};

				var gotATMs = function(atms) {
					$scope.atmList = atms;
					$scope.mapPins = _.reduce(atms, function(accum, value, index){
						accum.push({
							latitude: value.Latitude,
							longitude: value.Longitude,
							label: index + 1
						});
						return accum;
					}, locationPins);
					$ionicLoading.hide();
				};

				var searchATMs = function(data){
					AtmService.findATMs(data, 20).then(gotATMs, function(){
						$ionicLoading.hide();
						displayErrorMessage('Could not connect to the ATM service. Make sure that you have Internet access, and try again later.');
					});
				};

				var gotLocation = function(location) {
					var data = location.coords;
					data.type = 'geo';

					// Pin for current location
					locationPins.push({
						latitude: data.latitude,
						longitude: data.longitude,
						label: 'Me'
					});

					searchATMs(data);
				};

				var showHelp = function(){
					$ionicPopup.alert({
						title: 'What do those symbols mean?',
						templateUrl: 'templates/legendTemplate.html',
						okType: 'button-positive'
					});
				};

				var goToDetail = function(index){
					$state.go('atmdetail', {index: index});
				};

				var useAddress = $state.params.street || $state.params.city || $state.params.state;

				$scope.bingApiKey = BingApiKey;
				$scope.showHelp = showHelp;
				$scope.goToDetail = goToDetail;
				$ionicLoading.show({
					templateUrl: 'templates/loadingTemplate.html'
				});

				if(useAddress) {
					var data = {
						type: 'address',
						street: $state.params.street,
						city: $state.params.city,
						state: $state.params.state
					};

					searchATMs(data);
				}
				else {
					GeoLocationService.getCurrentPosition({timeout: 10000}).then(gotLocation, function(){
						$ionicLoading.hide();
						displayErrorMessage('Could not locate your device. Make sure that this app is granted access to location services and try again.');
					});
				}
			}]);
}());
