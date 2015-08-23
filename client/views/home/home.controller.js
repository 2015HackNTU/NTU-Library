'use strict';

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
  .controller('HomeCtrl', ['$scope','$http',function ($scope,$http) {


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
    $scope.ratio = 0;
    $scope.selected_seat;
    $scope.less_seat = [];

    $scope.init = function(){

    $http({
          method: 'GET',
          url: 'http://140.112.113.35:8080/StudyRoom/api/getSeatCount'
      }).success(function(data){
      $scope.emptySeat += parseInt(data[0].A) + parseInt(data[1].B) + parseInt(data[2].C);
      $scope.ratio = Math.round($scope.emptySeat *10000 / $scope.allseat)/100;
      });
		$http({
        	method: 'GET',
         	url: 'http://140.112.113.35:8080/StudyRoom/api/getVacancy'
     	}).success(function(data){
        // console.log(data);
 			data.forEach(function(elem,i){
 				var query = "circle[id*="+elem+"]"
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
    console.log(e + "is selected");
  }

	$scope.filter = function(){
		var selected_constraint = [];
 		//Check 哪些filter被選了
 		angular.forEach($scope.filtercontraint,function(val){
			val.forEach(function (elem,i){
				if (elem.selected){
					selected_constraint.push(elem.id);
				}
			})
		})


		var query = "div[id*=cla]"
		var myEl = angular.element( document.querySelectorAll(query) );
 		for (var i = 0; i < myEl.length;i++){
 			if (myEl[i].id.indexOf("A11") >= 0){
 				myEl[i].setAttribute("style", "background-color: green;");
 			}
 		}


	};
	$scope.showAlert = function(event){
		var selected = event.target.id.split('_');
		$scope.selected_seat = selected[0];
		console.log(selected[0]);
	}

	$scope.deletefilter = function(){
		angular.forEach($scope.filtercontraint,function(val){
			val.forEach(function (elem,i){
				elem.selected = false;
			})
		})
	}

	$scope.submit = function(){

		$http({
        	method: 'GET',
         	url: 'http://140.112.113.35:8080/StudyRoom/api/checkUser?user_id=' + userid
     	}).success(function(res){
 			if (!res.authority){			//Check Fail
 				console.log(res.message);	
 			}else{							//Check Access
 				console.log(res.token);
 				$http({
        			method: 'GET',
         			url: 'http://140.112.113.35:8080/StudyRoom/api/checkin?user_id='+userid+'&token='+res.token
     			}).success(function(res){
 					if (res.affected){		//Success

 					}else{					//Fail

 					}
    			});

 			}

    	});

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
