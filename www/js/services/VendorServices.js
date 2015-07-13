(function() {
	'use strict';
	
	angular.module('App.Services')
	/* Registration of services for bower libraries  */
	.factory('_', ['$window', function($window){
		return $window._;
	}])
	.factory('Papa', ['$window', function($window){
		return $window.Papa;
	}])
	.factory('BingMaps', ['$window', function($window){
		return $window.Microsoft.Maps;
	}]);
}());