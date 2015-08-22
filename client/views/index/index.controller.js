'use strict';

angular.module('ntuLibrary')
  .controller('IndexCtrl', ['$scope','$http',function ($scope,$http) {

    var vm = this;

    angular.extend(vm, {
      name: 'IndexCtrl'
    });
    $scope.filtercontraint = {
    	"laptop":[{
    		id: "com",
			name: "可以使用電腦",
			selected: false
    	},{
    		id: "non-com",
			name: "不可以使用電腦",
			selected: false
    	}],
    	"table":[{
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
    	}],
    	"ambient":[{
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

    $scope.allseat = 828;
    $scope.emptyseat = 0;
    $scope.ratio = 0;
    $scope.selected_seat;
    $scope.less_seat = [];

    $scope.init = function(){

		$http({
        	method: 'GET',
         	url: 'http://140.112.113.35:8080/StudyRoom/api/getVacancy?area=a'
     	}).success(function(data){
 			data.forEach(function(elem,i){
 				var query = "div[id*="+elem+"]"
 				var myEl = angular.element( document.querySelectorAll(query) );
 				if (myEl.length > 0){
 					myEl[0].setAttribute("style", "background-color: red;");
 				}
 			})
 			setLessSeat(data)

    		
    		
    	});

		// $http({
  //       	method: 'GET',
  //        	url: 'http://140.112.113.35:8080/StudyRoom/api/getSeatCount'
  //    	}).success(function(data){
 	// 		$scope.emptyseat += parseInt(data[0].A) + parseInt(data[1].B) + parseInt(data[2].C);
 	// 		$scope.ratio = Math.round($scope.emptyseat *10000 / $scope.allseat)/100;
  //   	});

	}

	$scope.init();

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
		$scope.selected_seat = selected[1];
		console.log(selected[1]);
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
		if (num > 9){
			return area+"00"+num
		}else if (num <= 99){
			return area+"0"+num
		}else{
			return area+num
		}
	}

	function setLessSeat(data){
		data.forEach(function (elem,i){
			var query = "div[id*="+elem+"]"
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

 			}else{

			}

 			}
		})
		

	}

  }]);


