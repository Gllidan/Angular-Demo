(function (angular) {
	angular.module('app').controller('bookCtrl',['$scope','$timeout','selfHttp','passData',function ($scope,$timeout,selfHttp,passData) {
		$scope.bookType = 'booklist';

		//点击请求推荐数据
		$scope.loopRequest = function () {
			//设置地址
			var url = 'https://api.douban.com/v2/book/search';
			//设置I接口
			var parames = {
				//根据标签搜索内容
				q:$scope.bookDetail.tags[2].name,
				apikey:'0b2bdeda43b5688921839c8ecb20399b',
				count:4
			}
			//请求数据
			selfHttp.jsonp(url,parames,function (data) {
				//获得推荐书籍部分
				$scope.ranBook = data.books;
				//跟新界面
				$scope.$apply();
			})
		}
		//控制视图显示隐藏 且 点击进来时 根据标签 获取推荐书籍数据 展示到推荐列表中
		$scope.nowClick = function (type,key) {
			$scope.bookType = type;
			//获取书本的标签信息,获取指定标签信息
			$scope.bookDetail = $scope.bookData.books[key];
			$scope.score = Math.round($scope.bookData.books[key].rating.average)+1;
			console.log($scope.score);
			$scope.ratio = -165+(165 * $scope.score)/11;
			console.log($scope.ratio);
			// document.querySelector('.start').style.background = 'url("../images/star.png")no-repeat'+ 0 + $scope.ratio + 'px' ;
			// angular.element(document.querySelector('.start')).css(this,'background','red');
			$scope.backSty = {
				'background':'url("images/star.png")no-repeat 0' + $scope.ratio + 'px'
			}
			$scope.loopRequest();
			// $scope.index = key;
		};
		//点击推荐书籍
		$scope.chooseClick = function (key) {
			$scope.bookDetail = $scope.ranBook[key];
			//设置推荐书籍部分
			$scope.loopRequest();
			
		}

		//点击写笔记,切换皮肤
		// $scope.change = function () {
		// 	$scope.cutFn('false');
		// 	document.querySelector('body').style.background = '#bf9188';
		// }
		//设置笔记盒子默认隐藏
		$scope.cut = false;
		//点击快速记录笔记
		$scope.write = function (type) {
			var time = new Date();
			var date = time.getFullYear() + ' - ' + parseInt(time.getMonth()+1) + ' - '  + time.getDate();
			$scope.date = date;
			$scope.cut = type;
		}
		//点击提交笔记
		$scope.refer = function (type,value) {
			//设置服务的时间 和 输入内容
			var obj = {};
			obj.innerDate = $scope.date;
			obj.details = value;
			obj.content = $scope.bookDetail.title;
			//push设置对象
			passData.memoData.push(obj);
			//控制显示隐藏
			$scope.cut = type;
			//清空输入
			$scope.writeSth = ''
		}

		//点击购书单
		$scope.buyClick = function () {
			var obj = {
				id:$scope.bookDetail.id,
				title:$scope.bookDetail.title,
				price:parseInt($scope.bookDetail.price),
				//设置数量
				amount:1
			}
			//当点击的时候,给服务的属性push一个对象进去
			passData.shopData.push(obj);
		};
		//控制显示隐藏
		$scope.display = '';
		//点击推荐按钮
		$scope.share = function (type) {
			// 豆瓣https://www.douban.com/share/service?name= &image=
			// 微博http://service.weibo.com/share/share.php?title= &pic=
			// qq分享http://connect.qq.com/widget/shareqq/index.html?url=http%3A%2F%2Flocalhost%3A63342%2Fdemo%2Fjs%2F%25E5%2588%2586%25E4%25BA%25AB.html%3F_ijt%3Dhoo1nehje93tri3s7me0t2bhei%230-sqq-1-80372-9737f6f9e09dfaf5d3fd14d775bfee85&title=&pics=
			$scope.writeSth = '';
			var url = '';
			var count = '推荐书籍' + '《' + $scope.bookDetail.title + '》';
			//根据输出值判断使用过哪个链接
			if(type == 'wei'){
				url = 'http://service.weibo.com/share/share.php?title=' + count + '&pic=' + $scope.bookDetail.image;
			}
			else if(type == 'dou'){
				url = 'http://service.weibo.com/share/share.php?title=' + count + '&pic=' + $scope.bookDetail.image;
			}
			else if(type == 'qq'){
				url = 'http://connect.qq.com/widget/shareqq/index.html?url=http%3A%2F%2Flocalhost%3A63342%2Fdemo%2Fjs%2F%25E5%2588%2586%25E4%25BA%25AB.html%3F_ijt%3Dhoo1nehje93tri3s7me0t2bhei%230-sqq-1-80372-9737f6f9e09dfaf5d3fd14d775bfee85&title=' + count + '&pics=' + $scope.bookDetail.image;
			}
			window.location.href = url;
		};
		//

	}])
})(angular);
