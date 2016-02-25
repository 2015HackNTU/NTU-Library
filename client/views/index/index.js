'use strict';

angular.module('ntuLibrary')
  .config(function ($routeProvider,$httpProvider) {
    $routeProvider
      .when('/index', {
        templateUrl: 'views/index/index.html',
        controller: 'IndexCtrl',
        controllerAs: 'vm'
      });
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });
