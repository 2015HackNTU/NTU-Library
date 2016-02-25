'use strict';

angular.module('ntuLibrary')
  .controller('IndexCtrl', ['$scope','$http',function ($scope,$http) {

    var vm = this;

    angular.extend(vm, {
      name: 'IndexCtrl'
    });
    

  }]);


