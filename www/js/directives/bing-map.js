(function(){
	'use strict';

	angular.module('App.Directives')
		.directive('bingMap', ['BingMaps', function(BingMaps) {

			var controller = function($scope, $element) {
				var map = new BingMaps.Map($element[0], {
					credentials: $scope.apikey,
					showDashboard: false,
					enableSearchLogo: false
				});

				var clearPushpins = function(){
					for(var i = map.entities.getLength() - 1; i >= 0; i--){
						var entity = map.entities.getAt(i);
						if(entity instanceof BingMaps.Pushpin){
							map.entities.removeAt(i);
						}
					}
				};

				var calculateBestZoom = function(viewRect, buffer, mapWidth, mapHeight){
					if(viewRect.width || viewRect.height) {
						// At least one of the dimensions of the rectangle is not zero, so one of the zoom levels
						// won't be Infinity (division by zero).

						// Zoom level based on map width
						var zoomW = Math.log((360.0 * (mapWidth - 2 * buffer)) / (256 * viewRect.width)) / Math.log(2);

						// Zoom level based on map height
						var zoomH = Math.log((360.0 * (mapHeight - 2 * buffer)) / (256 * viewRect.height)) / Math.log(2);

						return Math.floor(Math.min(zoomW, zoomH));
					}
					else {
						// If we don't have data to work with we will default to 14.
						// This usually happens when we only have one pin in the map.
						return 14;
					}
				};

				var getPinForLocation = function(location) {
					var loc = new BingMaps.Location(location.latitude, location.longitude);
					var pushpin = new BingMaps.Pushpin(loc, {
						text: location.label ? location.label.toString() : '',
						textOffset: new BingMaps.Point(0, 5),
						icon: location.label === 'Me' ? 'img/pushpinMe.svg' : 'img/pushpin.svg',
						height: 30,
						width: 30
					});

					return pushpin;
				};

				$scope.$watch('pushpins', function(newValue){
					if(newValue){
						clearPushpins();
						var locations = [];

						if(angular.isArray(newValue)){
							// We need to start from the last location so the z-index of the pins on the map is correct
							for(var idx = newValue.length - 1; idx >= 0; idx--){
								var pushpin = getPinForLocation(newValue[idx]);
								map.entities.push(pushpin);
								locations.push(pushpin.getLocation());
							}
						}
						else {
							var pushpin = getPinForLocation(newValue);
							map.entities.push(pushpin);
							locations.push(pushpin.getLocation());
						}

						var viewRect = BingMaps.LocationRect.fromLocations(locations);
						var bufferPx = 45;
						var zoomLevel = calculateBestZoom(viewRect, bufferPx, $element[0].parentElement.clientWidth, $element[0].parentElement.clientHeight);
						map.setView({animate: true, center: viewRect.center, zoom: zoomLevel});
					}
				});
			};

			return {
				template: '<div class="bingMap"></div>',
				restrict: 'E', // Only match element name
				replace: true,
				scope: {
					apikey: '=',
					pushpins: '=?'
				},
				controller: controller
			};
		}]);
}());
