(function (angular) {
	//创建指令,实现组件复用.
	angular.module('app').directive('detail',function () {
		return{
			restrict:'EA',
			templateUrl:'view/other.html'
		}
	});


})(angular)
