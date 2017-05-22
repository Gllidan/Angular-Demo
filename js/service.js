(function (angular) {
	//自定义指令
	angular.module('app').service('selfHttp',['$window',function ($window) {
		this.jsonp = function (url,params,fn) {
			var url = url;
			//设置随机的函数名
			var cbName = 'selfcallback' + Math.random().toString().slice(2);
			//格式化参数
			var queryStr = '';
			//遍历接口,并设置格式
			for(var k in params){
				queryStr += k + '=' + params[k] + '&';
			}
			queryStr += 'callback=' + cbName;
			//拼接地址
			var nUrl = url + '?' + queryStr ;
			//创建script标签
			var script = $window.document.createElement('script');
			$window.document.body.appendChild(script);
			//设置标签地址
			script.src = nUrl;
			//设置跨域方法
			$window[cbName] = function (data) {
				fn(data);
				console.log(nUrl);
				//请求完成移除标签
				$window.document.body.removeChild(script);
			}
		};
	}]);
	//定义服务,用于购物车传值
	angular.module('app').factory('passData',function () {
		return{
			//设置一个空数组,赋值为一个空数组
			shopData:[],
			//设置备忘录传值
			memoData:[]
		}
	});
})(angular);
