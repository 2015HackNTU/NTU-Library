'use strict';

angular.module('ntuLibrary')
  .service('Seat', function ($http) {

    this.getHistory = function(user){
      $http({
        method: 'GET',
        url: './api/seat/getHistory',
        data: {
          userid: user
        }
      }).success(function(data){
        console.log(data) 
      });
    };



     this.create = function(user,seat,startTime,endTime){
      $http({
        method: 'POST',
        url: './api/seat/create',
        data: {
          userid: user,
          seat: seat,
          start: startTime,
          end: endTime
        }
      }).success(function(data){
        console.log(data) 
      });
    };

});
