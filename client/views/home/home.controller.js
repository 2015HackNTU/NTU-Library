'use strict';
// var Promise = require('promise');
angular.module('ntuLibrary')
.directive('circle', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            element.bind('click', function($event) {
               	scope.showAlert($event);
            });
        }
    }
});


angular.module('ntuLibrary')
  .controller('HomeCtrl', ['$scope','$http','$timeout','Seat',function ($scope,$http,$timeout,Seat) {


    var vm = this;

    angular.extend(vm, {
      name: 'HomeCtrl'
    });

    

    $scope.filterConstraint = [
        {
          "name":"電腦區域",
          "enName":"Laptop Area",
          "filter":
          [{
          id: "com",
          name: "可以使用電腦",
          enName:"Laptop Allowed",
          selected: false
          },
          {
            id: "non-com",
          name: "不可以使用電腦",
          enName:"Laptop Forbidden",
          selected: false
          }]
        },
        {
          "name":"桌子類型",
          "enName":"Table Type",
          "filter":[{
            id: "less",
          name: "同桌人少",
          enName: "Less People",
          selected: false
          },{
            id: "s4",
          name: "四人座",
          enName: "4 People Table",
          selected: false
          },{
            id: "s6",
          name: "六人座",
          enName: "6 People Table",
          selected: false
          },{
            id: "cla",
          name: "對面有隔板",
          enName: "With Partition",
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
          enName: "Near Window",
          selected: false
          },{
            id: "wal",
          name: "靠近牆邊",
          enName: "Near Wall",
          selected: false
          },{
            id: "ais",
          name: "遠離走道",
          enName: "Far From Aisle",
          selected: false
          },{
            id: "t",
          name: "遠離廁所",
          enName: "Far From Restroom",
          selected: false
          },{
            id: "r",
          name: "遠離讀卡機",
          enName: "Far From Card Reader",
          selected: false
          }]
        }

      ]

    $scope.allseat = 828;
    $scope.emptySeat = 0;
    $scope.userid = "";
    $scope.ratio = 0;
    $scope.vacancySeat = [];
    $scope.nowFilterSelcted = [];
    $scope.isSelected = false;
    $scope.selected_seat = "尚未選擇";
    $scope.historyData = false;
    $scope.noti_display = true;
    $scope.lastSeat = "";
    $scope.historySeat = [];
    $scope.less_seat = [];
    $scope.historyStyle = [{"display":"none"},{"display":"none"}];

    $scope.init = function(){

    $http({
          method: 'GET',
          url: 'http://140.112.113.35:8080/StudyRoom/api/getSeatCount'
      }).success(function(data){
      $scope.emptySeat += parseInt(data[0].A) + parseInt(data[1].B) + parseInt(data[2].C);
      $scope.ratio = (Math.round($scope.emptySeat *10000 / $scope.allseat)/100).toFixed(1);
      });
		$http({
        	method: 'GET',
         	url: 'http://140.112.113.35:8080/StudyRoom/api/getVacancy'
     	}).success(function(data){
        $scope.vacancySeat = data;
 			  data.forEach(function(elem,i){
 			  	var query = "circle[id*="+elem+"]";
 			  	var myEl = angular.element( document.querySelectorAll(query) );
 			  	if (myEl.length > 0){
 			  		myEl[0].setAttribute("style","fill:#6DBD76;");
 			  	}
 			  })
 			  setLessSeat(data)
    		
    	});

	}

	$scope.init();

  $scope.filterSelected = function(e){
    if (e.selected)
      $scope.nowFilterSelcted.push(e.id);
    else{
      var index = $scope.nowFilterSelcted.indexOf(e.id)
      $scope.nowFilterSelcted.splice(index,1);
    }
    setfilter();
  }

	function setfilter(){
    var myEl = angular.element( document.getElementsByTagName("circle") );
    var match = true;
    for (var i = 0; i < myEl.length;i++){
      var Seat = myEl[i].id.split("_");
      var Seatid = Seat[0];
      match = true;

      for (var j = 0; j < $scope.nowFilterSelcted.length; j++){
        if ($scope.nowFilterSelcted[j] == 'non-com'){
          if (myEl[i].id.indexOf('com') >= 0){
            match = false;
            break;
          }
        }else if ($scope.nowFilterSelcted[j] == 'r' || $scope.nowFilterSelcted[j] == 't'){
          if (myEl[i].id.indexOf($scope.nowFilterSelcted[j]) >= 0){
            match = false;
            break;
          }
        }else if ($scope.nowFilterSelcted[j] == 'less'){
          if ($scope.less_seat.indexOf(Seatid) < 0){
            match = false;
            break;
          }
        }else{
          if (myEl[i].id.indexOf($scope.nowFilterSelcted[j]) < 0){
            match = false;
            break;
          }
        }

      }
      if ($scope.vacancySeat.indexOf(Seatid) >= 0){
        if (match){
          myEl[i].setAttribute("style", "opacity: 1; fill:#6DBD76;"); 
        }else{
          myEl[i].setAttribute("style", "opacity: 0.1; fill:#6DBD76;"); 
        }
      }else{
        if (match){
          myEl[i].setAttribute("style", "opacity: 1; fill:#D65454;"); 
        }else{
          myEl[i].setAttribute("style", "opacity: 0.1; fill:#D65454;"); 
        }

      }  
    }


	};
  
	$scope.showAlert = function(event){
		var selected = event.target.id.split('_');
    // change(selected[0]);
    // $scope.$apply(function(){
      // $scope.selected_seat = selected[0];
    // });
    $timeout(function(){
      $scope.isSelected = true;
      $scope.selected_seat = selected[0]; 
    },100)
	}
  $scope.clearSelect = function(){
    // change("尚未選擇")
    $timeout(function(){
      $scope.isSelected = false;
      $scope.selected_seat = "尚未選擇";
    },100)
  }

	$scope.deleteFilter = function(){
    console.log("Hi")
		$scope.filterConstraint.forEach(function (elem,i){
			elem.filter.forEach(function (val,idx){
        val.selected = false;
      })
		});
    $scope.nowFilterSelcted = [];
    setfilter();
	}



	// $scope.submit = function(){

	// 	$http({
 //        	method: 'GET',
 //         	url: 'http://140.112.113.35:8080/StudyRoom/api/checkUser?user_id=' + userid
 //     	}).success(function(res){
 // 			if (!res.authority){			//Check Fail
 // 				console.log(res.message);	
 // 			}else{							//Check Access
 // 				console.log(res.token);
 // 				$http({
 //        			method: 'GET',
 //         			url: 'http://140.112.113.35:8080/StudyRoom/api/checkin?user_id='+userid+'&token='+res.token
 //     			}).success(function(res){
 // 					if (res.affected){		//Success

 // 					}else{					//Fail

 // 					}
 //    			});

 // 			}

 //    	});

	// }


  $scope.submit = function(){
    var endDate = new Date();
    var startDate = new Date(Date.parse(endDate) - 3600000*2);
    Seat.create($scope.userid,$scope.selected_seat,startDate,endDate)
    .then(function(msg){      
      console.log(msg);
      if(msg.statusText === "OK"){  
        $scope.noti_display = false;
        $timeout(function(){
          $scope.noti_display = true;
          $scope.selected_seat = "尚未選擇";
          $scope.isSelected = false;
          $scope.userid = "";
          $scope.lastSeat = "";
          $scope.historySeat = "";
          $scope.historyStyle = [{"display":"none"},{"display":"none"}];
        },5000)
      }
    },function(err){
      console.log(err);
    });

  };
  $scope.getHistory = function(){
    console.log("getHistory changes!!! " , $scope.userid);
    $scope.historyData = false;
    $scope.historySeat = [];
    $scope.historyStyle = [{"display":"none"},{"display":"none"}];
    if($scope.userid.length === 9){
      Seat.getHistory($scope.userid)
      .then(function(data){
        if (data.data.length == 0){
          $scope.historyData = false;
          $scope.historyStyle[1] = {"display":"block"};
        }else{
          $scope.historyData = true;
          $scope.historyStyle[0] = {"display":"block"};
          data.data.forEach(function (elem,i){
            // outputData.push(elem);
            if (i == 0)
              $scope.lastSeat = data.data[i].seat;
            $scope.historySeat.push(elem.seat);
            // console.log($scope.historySeat);
            // console.log(elem.userID, elem.seat, elem.endTime);
          })
          console.log($scope.historySeat);
        }
        
      },function(err){
        console.log(err);
      });

    }

  }


	function setID(area,num){
		if (num < 9){
			return area+"00"+num
		}else if (num <= 99){
			return area+"0"+num
		}else{
			return area+num
		}
	}

	function setLessSeat(data){
		data.forEach(function (elem,i){
			var query = "circle[id*="+elem+"]"
 			var myEl = angular.element( document.querySelectorAll(query) );
 			if (myEl.length > 0){
 				var elementid = myEl[0].id;
 			var mateID;
 			var tablemate = [];
 			var count = 0;
 			if (myEl[0].id.indexOf('s6') >= 0){
 				var substr = elem.substr(1,3);
 				var num = parseInt(substr)
 				var remainder = num % 6
 				if (remainder == 0)
 					remainder = 6;
 				tablemate = [];
 				count = 0;
 				for (var i = 1 ; i < remainder;i++){
 					mateID = setID(elem.substr(0,1),num-i);
 					tablemate.push(mateID);
 				}
 				for (var i = 1 ; i <= (6-remainder); i++){
 					mateID = setID(elem.substr(0,1),num+i);
 					tablemate.push(mateID);
 				}
 				tablemate.forEach(function (val,idx){
 					if (data.indexOf(val) >= 0)
 						count++;
 				})
 				if (count >= 3)
 					$scope.less_seat.push(elem)

 			}else if(myEl[0].id.indexOf('s4') >= 0){
 				var substr = elem.substr(1,3);
 				var num = parseInt(substr)
 				var remainder = num % 4
 				if (remainder == 0)
 					remainder = 4;
 				tablemate = [];
 				count = 0;
 				for (var i = 1 ; i < remainder;i++){
 					mateID = setID(elem.substr(0,1),num-i);
 					tablemate.push(mateID);
 				}
 				for (var i = 1 ; i <= (4-remainder); i++){
 					mateID = setID(elem.substr(0,1),num+i);
 					tablemate.push(mateID);
 				}
 				tablemate.forEach(function (val,idx){
 					if (data.indexOf(val) >= 0)
 						count++;
 				})
 				if (count >= 2)
 					$scope.less_seat.push(elem)

 			}
 		}else{
 			// console.log(elem)
 		}
		})
		// console.log($scope.less_seat)
		

	}
  

  }]);
