(function(){
	'use strict';

	angular.module('App.Services')
		.factory('AtmService', ['AtmBaseUrl', '$http', '$q', '_', 'Papa', function(AtmBaseUrl, $http, $q, _, Papa){
			var atmCache = [];

			var buildUrl = function(data) {
				var baseUrl = AtmBaseUrl + '/locator/locator-csv.php?loctype=AS';
				if(data.type === 'geo') {
					return baseUrl + '&latitude=' + data.latitude + '&longitude=' + data.longitude;
				}
				else {
					return baseUrl + '&address=' + data.street + '&city=' + data.city + '&state=' + data.state;
				}
			};

			var findATMs = function(data, limit) {
				var defer = $q.defer();

				var url = buildUrl(data);
				$http.get(url)
					.success(function(response) {
						var result = Papa.parse(response, {header: true});

						// Remove items that failed to be parsed
						var errorIndexes = _.pluck(result.errors, 'row');
						_.pullAt(result.data, errorIndexes);

						if(result.data.length === 0) {
							defer.reject();
						}

						atmCache = limit ? _.take(result.data, limit) : result.data;
						defer.resolve(atmCache);
					})
					.error(function(){
						defer.reject();
					});

				return defer.promise;
			};

			var getATMAt = function(index) {
				if(index >= 0 && atmCache.length > 0 && index < atmCache.length) {
					return atmCache[index];
				}
				return null;
			};

			return {
				findATMs: findATMs,
				getATMAt: getATMAt
			};
		}]);
}());
