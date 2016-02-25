'use strict';

angular.module('ntuLibrary')
  .directive('map', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      templateUrl: 'directives/map/map.xml',
      link: function($scope, $elem, $attrs){
      	$timeout(function(){
      		/* svg pan */
			var svgElement = document.querySelectorAll("map svg")[0];
		    window.zoomMap = svgPanZoom(svgElement, {
		        zoomEnabled: true,
		        controlIconsEnabled: true,
		        fit: true,
		        center: true
		    });
      	})
      }
    };
  }]
);