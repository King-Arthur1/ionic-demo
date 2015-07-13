(function(){
	'use strict';

	angular.module('App.Services')
		.factory('GeoLocationService', ['$window', '$q', function($window, $q){
			var getCurrentPosition = function(options) {
				var defer = $q.defer();
				if($window.navigator.geolocation){
					$window.navigator.geolocation.getCurrentPosition(function(position){
							defer.resolve(position);
						}, function() {
							defer.reject();
						},
						options);
				}
				else {
					defer.reject();
				}
				return defer.promise;
			};

			return {
				getCurrentPosition: getCurrentPosition
			};
		}]);
}());

