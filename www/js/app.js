(function() {
  'use strict';
  
  // Rest of our modules with no dependencies
  angular.module('App.Services', []);
  angular.module('App.Directives', []);
  angular.module('App.Controllers', []);
  
  angular.module('App', ['ionic', 'App.Services', 'App.Directives', 'App.Controllers'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        window.StatusBar.styleLightContent();
      }
    });
  })
  
  /* Constants */
  .constant('BingApiKey', '')
	.constant('AtmBaseUrl', '')
  
  .config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'views/home.html'
			})
			.state('addressform', {
				url: '/addressform',
				controller: 'AddressFormController',
				templateUrl: 'views/addressform.html'
			})
			.state('atmlist', {
				url: '/atmlist/:street/:city/:state',
				params: { street: null, city: null, state: null },
				controller: 'AtmListController',
				templateUrl: 'views/atmlist.html'
			})
			.state('atmdetail', {
				url: '/atmdetail/:index',
				controller: 'AtmDetailController',
				templateUrl: 'views/atmdetail.html'
			});

			$urlRouterProvider.otherwise('/home');
  });

}());
