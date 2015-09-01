'use strict';

angular.module('ntuLibrary')
  .service('Seat', function ($http) {

    this.getHistory = function(user){
      $http({
        method: 'POST',
        url: './api/seat/getHistory',
        data: {
          userid: user
        }
      }).success(function(data){
        data.forEach(function (elem,i){
          console.log(elem.userID, elem.seat, elem.endTime);
        })
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
        console.log(data);
      });
    };

});
