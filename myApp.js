	(function(){
		var app=angular.module('myApp',['ui.bootstrap']);
		app.controller('myCtrl',function($scope,$location,$http){
			$scope.reversed=false;
			$scope.orderType='code';
			$scope.show_info=false;
			$scope.sortBy=function(type){
				$scope.show_info=false;
				$scope.orderType=type;
				$scope.reversed=!$scope.reversed;
			}
			$scope.isSorted=function(order,type){
				if(order==='asc'){
					return $scope.reversed===true && type===$scope.orderType;
				}
				else if(order==='desc'){
					return $scope.reversed===false && type===$scope.orderType;
				}
				return false;
			};
			$scope.regions=[];
			$http.get('select.php').then(function(response){
				$scope.countries=response.data.countries;
			}).then(function(){
				angular.forEach($scope.countries,function(value){
					if($scope.regions.indexOf(value['region'])===-1){
						$scope.regions.push(value['region']);
					}
				})
			});
			$scope.show_info=false;
			$scope.select=function(count){
				$scope.selected=count;
				$scope.show_info=true;
				return $scope.selected;
			};
			
			$scope.pageSize=10;
			$scope.currentPage=1;
			$scope.show_pages=true;
			
			$scope.changeSelect=function(sel){
				$scope.show_info=false;
				$scope.currentPage=1;
				if(sel.region===null || sel.region===''){
					delete sel.region;
				}
			};
			
		});
		app.filter('startFrom',function(){
			return function(data,start){
				if(!data|| !data.length){
					return;
				}
				return data.slice(start);
			};
		});
		
	})()	