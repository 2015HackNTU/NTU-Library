'use strict';

angular.module('ntuLibrary')
  .directive('map', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/map/map.xml'
    };
  });