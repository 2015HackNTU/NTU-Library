'use strict';
// var Promise = require('promise');
angular.module('ntuLibrary')
  .service('Seat', function ($http) {

    this.getHistory = function(user){
      var outputData = [];
      $http({
        method: 'POST',
        url: './api/seat/getHistory',
        data: {
          userid: user
        }
      })
      .then(function(data){
        data.forEach(function (elem,i){
          outputData.push(elem);
          console.log(elem.userID, elem.seat, elem.endTime);
        })
      }, function(err){
        console.log("error is :" , err);
      })
      .then(function(){
        return outputData;
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
