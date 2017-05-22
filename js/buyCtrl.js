(function (angular) {
	angular.module('app').controller('buyCtrl',['$scope','passData',function ($scope,passData) {
		//接收服务传递的参数
		$scope.data = passData.shopData;
		//设置商品默认数量
		//设置点击清除商品
		$scope.clear = function (key,value) {
			//根据对应索引,删除数组中对应索引的数据
			$scope.index = key;
			$scope.show = value;
		}
		//点击确认
		$scope.affirm = function () {
			//清除对应索引的对象
			$scope.data.splice($scope.index,1);
			$scope.show = false;
		}
		//点击取消
		$scope.abolish = function () {
			$scope.show = false;
		}
		//设置加
		$scope.add = function (key) {
			console.log(passData.memoData);
			console.log(passData.shopData);
			$scope.data[key].amount ++;
		}
		//设置减
		$scope.minus = function (key) {
			$scope.data[key].amount --;
			if($scope.data[key].amount <1){
				$scope.clear(key);
			}
		}
		//设置获取总量的方法
		$scope.gross = function () {
			//初始化变量
			var index = 0;
			//调用angular.forEach方法,遍历data对象
			angular.forEach($scope.data,function (item) {
				//根据索引数来增加数量
				index += item.amount;
			});
			//返回变量
			return index;
		};
		//设置计算总价方法
		$scope.totalPay = function () {
			var index = 0;
			angular.forEach($scope.data,function (item) {
				index += item.price * item.amount;
			})
			return index;
		};

	}])
})(angular)
