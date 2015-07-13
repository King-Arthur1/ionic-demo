(function(){
	'use strict';

	angular.module('App.Services')
		.factory('LaunchNavigatorService', ['$window', '$q', function($window, $q){
			var navigate = function(destination, origin, options) {
				var defer = $q.defer();
				if($window.launchnavigator && $window.launchnavigator.navigate){
					$window.launchnavigator.navigate(
						destination,
						origin,
						function() { defer.resolve(); },
						function() { defer.reject(); },
						options);
				}
				else {
					defer.reject();
				}
				return defer.promise;
			};

			return {
				navigate: navigate
			};
		}]);
}());

