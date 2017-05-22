angular.module('app').controller('weatherCtrl',['$scope','$http',function ($scope,$http) {
	//天气预报
// http://api.yytianqi.com/observe?city=CH280101&key=o8kh5pdsise26m55

	//设置默认显示城市
	$scope.liShow = 0;
	//设置默认显示城市数据
	$scope.current = 0;
	//设置默认其他li选项隐藏
	$scope.type = false;
	$scope.liHover = function (type) {
		$scope.type = type;
	}
	$scope.liClick = function (type,num) {
		$scope.type = false;
		$scope.liShow = num;
		$scope.current = num;
	}
	$scope.leave = function (type) {
		$scope.type = type;
	}
}])
