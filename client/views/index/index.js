'use strict';

angular.module('ntuLibrary')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/index', {
        templateUrl: 'views/index/index.html',
        controller: 'IndexCtrl',
        controllerAs: 'vm'
      });
  });
