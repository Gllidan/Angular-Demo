(function (angular) {
	'use strict'
	//点击刷新跳转
	window.location.href="http://localhost:63342/demo/index.html?_ijt=umdbk46nq40glbcfnaih27i756#!/undone";

	var app = angular.module('app',['ui.router']);

	app.controller('appCtrl',['$scope','$state','selfHttp','$http','passData',function ($scope,$state,selfHttp,$http,passData) {
		console.log(passData);
		//设置flag(设置详情蒙版)
		$scope.flag = false;
		//设置当前点击页面(tab标签切换)
		$scope.type = 1;
		$scope.typeTo = 1;
		//输入内容
		$scope.text = '';
		//待办事项
		$scope.temp = [];
		$scope.bookArr = [];
		//遍历服务数组,并逐个添加到数组中
		$scope.bookArr.unshift(angular.forEach(passData.memoData,function (index) {
			return passData.memoData[index];
		}))
		$scope.temp = $scope.bookArr[0];
		// 	}):$scope.temp = [];
		//完成事项
		$scope.finish = [];
		//记录点击索引
		$scope.index = 0;
		//记录点击标题
		$scope.interTitle = '';
		//点击提交记录
		$scope.getText = function () {
			console.log($scope.bookArr);
			//确认有输入值,才添加内容
			if($scope.text){
				//获取当前时间
				var time = new Date();
				var date = time.getFullYear() + ' - ' + parseInt(time.getMonth()+1) +' - '  + time.getDate();
				//往数组添加内容
				$scope.temp.unshift({
					content:$scope.text,
					innerDate:date
				});
				//输入框返回默认状态
				$scope.text = '';
				$scope.type = 1;
			}else{
				alert('请添加内容')
			}
		};
		//点击删除事件
		$scope.delete = function (index) {
			if($scope.type == 1){
				//移除对应索引的子对象
				$scope.temp.splice(index,1);
			}
			else{
				$scope.finish. splice(index,1);
			}

		};
		//点击checkbox事件
		$scope.check = function (index) {
			if($scope.type ==1){
				//将对象添加到完成数组
				$scope.finish.unshift($scope.temp[index]);
				//删除点击的待办对象
				$scope.delete(index);
			}
			else{
				//添加到待办数组
				$scope.temp.unshift($scope.finish[index]);
				//删除点击的完成事项
				$scope.delete(index)
			}
		}
		//tab切换 和 点击就立刻加载数据功能实现
		var movieFlag = true;
		var musicFlag = true;
		var clickTime = 0;
		$scope.change = function (num)  {
			//记录点击,目的为了解决点击切换状态过快导致的数据覆盖问题(当点击movie时,立刻点击music,由于网络延迟,内部判断机制无法正确给movieData赋值,系统直接把请求到的data赋值给最后点击的music,这时,相当于music又重新加载了一次数据,导致虽然有了数据,但由于没有手动apply,所以无法执行repeat,这里的解决办法是,直接判断点击次数并且结合前面的点击开关,如果点击等于2,且开关为false,则将请求的数据直接赋值给movieData.但是这样又会有一个问题,就是当已经点击过标签后,然后点击search时,由于此时的开关为false,次数也一等于2,这样会导致搜索music的内容时,请求的数据也同时赋值给了movie,这个问题的解决方法是江记录点击挪到changge事件根作用域来,且限定叠加次数,这样就完美解决问题了)
			clickTime<5?clickTime++:clickTime;
			$scope.type = num;
			//如果当前页面为第二页，且对应页的加载数据为空就重新发送请求，获取数据
			if($scope.type ==2 && !$scope.movieData && movieFlag){
				url = 'https:/api.douban.com/v2/movie/in_theaters';
				$scope.loadData(url,$scope.search);
				$scope.what = 'movie';
				movieFlag = false;
				clickTime++;
			}
			//设置点击音乐搜索推荐
			if($scope.type ==3 && !$scope.musicData && musicFlag){
				url = 'https://api.douban.com/v2/music/search?q=周杰伦';
				$scope.loadData(url,$scope.search);
				$scope.what = 'music';
				musicFlag = false;
			}

		};
		//点击蒙版关闭
		$scope.close = function () {
			$scope.flag = !$scope.flag;
		}
		//点击未完成详情
		$scope.detail = function (key) {
			$scope.flag = !$scope.flag;
			//记录点击索引
			$scope.index = key;
			//如果点击的是第一页
			if($scope.type == 1){
				//获取temp数组中,对应索引子对象的content属性
				$scope.innerTitle = $scope.temp[$scope.index].content;
				//在点击详情的时候,获取数组内的详情内容,没有即为空
				$scope.innerText = $scope.temp[$scope.index].details;
				$scope.date = $scope.temp[$scope.index].innerDate;
			}
			else{
				//获取完成事项数组的内容
				$scope.innerTitle = $scope.finish[$scope.index].content;
				//获取完成事项数组的详情
				$scope.innerText = $scope.finish[$scope.index].details;
			}
		};
		//阻止冒泡
		$scope.clickBox = function (e) {
			e.stopPropagation();
		};
		//点击待办提交
		$scope.submit = function () {
			//通过索引判断对应checked属性 判断点击的是 temp 还是 finish ------- 错误 (只要通过索引判,都会有判断错误.)
			// 有这样的判断有两种情况:1.找不到待办的对应索引项,可以跳完成事项的语句 2.但是待办和完成有一样的索引数目 ,它都会先找到待办的对应索引,并且checked必定为false,所以这种判断只会在待办为空时,才会执行下面语句. 最简单的想法就是判断点击的是哪一页.给页面添加标识符,比如$scope.type == 1时,就为1.因为type会根据点击tab标签切换而改变值所以用来判断再合适不过
			//判断点击哪一页来分别执行语句
			if($scope.type == 1){
				//动态给对应对象赋的详情属性赋值
				$scope.temp[$scope.index].details = $scope.innerText;
				$scope.temp[$scope.index].content = $scope.innerTitle;
			}
			else {
				$scope.finish[$scope.index].details = $scope.innerText;
				$scope.finish[$scope.index].content = $scope.innerTitle;
			}
			//关闭窗口
			$scope.flag = !$scope.flag;
		}
		//*******************************************************************************//
		//切换隐藏显示
		$scope.cut = 'true';
		$scope.cutToo = 'true';
		//功能切换
		$scope.cutFn = function (type) {
			//使用ui-router的$state.go接口,来指定跳转页面
			//该方法接收两个参数: 1.指定state状态 2.url参数(可选,通过函数传参赋值)
			$scope.cut = type;
			$scope.cutToo = type;
			if(type == true){
				document.querySelector('body').style.background = '#bf9188';
				//设置标签选中状态
				$scope.type = 1;
				$state.go('undone');
			}
			else{
				document.querySelector('body').style.background = '#80999f';
				$state.go('book');
				$scope.type = 1;
			}

		}
		//搜索地址
		//电影:https://api.douban.com/v2/movie/search?q=搜索内容
		//电影热映https://api.douban.com//v2/movie/in_theaters
		$scope.search = '';
		//搜索点击
		//给what绑定属性,让点击search时,按类型搜索
		$scope.searchFn = function () {
			if(!$scope.search){
				alert('请输入内容');
				return
			}
			if($scope.type == 1){
				//根据当前点击哪一个标签来跳转哪个页面
				$scope.what = 'book';
			}
			else if($scope.type == 2){
				$scope.what = 'movie';
			}
			else if($scope.type == 3){
				$scope.what = 'music';
			}
			//设置传参
			var search = $scope.search;
			url ='https://api.douban.com/v2/' + $scope.what + '/search';
			$scope.loadData(url,search);
			$scope.search = '';
		};

		//天气预报
		// http://api.yytianqi.com/observe?city=CH280101&key=o8kh5pdsise26m55
		//设置请求数据数组
		var city = ['CH280101&','CH280601','CH010100','CH020100'];
		$scope.weather = [];
		for(var i = 0,leng=city.length; i<leng; i++){
			var weatherUrl = 'http://api.yytianqi.com/observe?city=' +city[i]+'&key=o8kh5pdsise26m55'
			$http({
				url:weatherUrl,
				method:'get'
			}).then(function (res) {
				$scope.weather.push(res.data.data)
			}).catch(function (error) {
				console.log(error);
			});
		}
		//-----------------------刷新的时候,怎么跳转默认锚点???????--小bug
		//自动加载数据
		$scope.loadData = function (url,search) {
			//https://api.douban.com/v2/movie/search?q=搜索内容
			//因为需要第一次点击页面获取推荐数据,需要链接单独的api接口,判断是否是第一次点击,则搜索内容是否为空
			if(!search){
				params = {
					apikey:'0b2bdeda43b5688921839c8ecb20399b'
				}
			}
			else{
				//地址中的中文内容转码
				url = encodeURI(url);
				var params = {
					//搜索内容
					q:search,
					apikey:'0b2bdeda43b5688921839c8ecb20399b',
					//搜索数量
					count:18
				};
			}
			selfHttp.jsonp(url,params,function (data) {
				if($scope.what == 'book'){
					$scope.bookData = data;
					console.log($scope.bookData);
					//在apply第一次运行时,数据由于延迟问题还没接收到,所以画面渲染不出来,需要手动执行apply一下来重新加载数据
					//数据需要分开绑定不然每次点击都需要重新获取数据
				}
				else if($scope.what == 'movie'){
					$scope.movieData = data;
					console.log($scope.movieData);
				}
				else if($scope.what == 'music'){
					if(movieFlag == false && clickTime == 3){
						$scope.movieData = data;
						selfHttp.jsonp(url,params,function (data) {
							$scope.musicData = data;
						})
					}
					else {
						$scope.musicData = data;
						console.log($scope.musicData+'1');
						console.log($scope.what);
						console.log(clickTime);
					}
				};
				$scope.$apply();
			});

		};
		$scope.what = 'book';
		var sort = '职场'
		var url ='https://api.douban.com/v2/' + $scope.what + '/search';
		$scope.loadData(url,sort);
		//设置返回按键
		$scope.return = function () {
			if($scope.type == 1){
				$state.go("book",{},{reload:true});
			}
			if($scope.type == 2){
				$state.go("movie",{},{reload:true});
				$scope.type = 2;
			}
			if($scope.type == 3){
				$state.go("music",{},{reload:true});
				$scope.type = 3;
			}


		}

	}]);
	//设置book子路由控制器

})(angular);

