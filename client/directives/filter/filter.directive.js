'use strict';

angular.module('ntuLibrary')
	.directive('filter', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/filter/filter.html'
    };
  })
	.controller('filterCtrl', ['$scope', function($scope){
		var vm = this;

    angular.extend(vm, {
      name: 'filterCtrl'
    });
	  $scope.filterConstraint = [
	    	{
	    		"name":"電腦區域",
	    		"enName":"Laptop Area",
	    		"filter":
	    		[{
	    		id: "com",
  				name: "可以使用電腦",
  				selected: false
  	    	},
  	    	{
  	    		id: "non-com",
  				name: "不可以使用電腦",
  				selected: false
  	    	}]
  	    },
	    	{
	    		"name":"桌子類型",
	    		"enName":"Table Type",
	    		"filter":[{
  	    		id: "less",
  				name: "同桌人少",
  				selected: false
  	    	},{
  	    		id: "s4",
  				name: "四人座",
  				selected: false
  	    	},{
  	    		id: "s6",
  				name: "六人座",
  				selected: false
  	    	},{
  	    		id: "cla",
  				name: "對面有隔板",
  				selected: false
  	    	}]
	    	},
	    	{
	    		"name":"周邊環境",
	    		"enName":"Ambient Conditions",
	    		"filter":
	    		[{
  	    		id: "win",
  				name: "靠近窗邊",
  				selected: false
  	    	},{
  	    		id: "wal",
  				name: "靠近牆邊",
  				selected: false
  	    	},{
  	    		id: "ais",
  				name: "遠離走道",
  				selected: false
  	    	},{
  	    		id: "t",
  				name: "靠近廁所",
  				selected: false
  	    	},{
  	    		id: "r",
  				name: "靠近讀卡機",
  				selected: false
  	    	}]
  	    }

	    ]
  }]);