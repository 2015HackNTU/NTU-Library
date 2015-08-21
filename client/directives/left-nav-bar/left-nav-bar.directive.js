'use strict';

angular.module('ntuLibrary')
  .directive('leftNavBar', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/left-nav-bar/left-nav-bar.html'
    };
  });