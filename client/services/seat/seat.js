'use strict';
// var Promise = require('promise');
angular.module('ntuLibrary')
  .service('Seat', function ($http) {

    this.getHistory = function(user){
      return $http({
        method: 'POST',
        url: './api/seat/getHistory',
        data: {
          userid: user
        }
      });
      
    };



     this.create = function(user,seat,startTime,endTime){
      return $http({
        method: 'POST',
        url: './api/seat/create',
        data: {
          userid: user,
          seat: seat,
          start: startTime,
          end: endTime
        }
      })
    };

});
