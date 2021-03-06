(function (angular) {
	angular.module('app').config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
		$stateProvider.state('undone',{
			url:'/undone',
			views:{
				undone:{
					templateUrl:'view/undone.html',
				}
			}
		}).state('done',{
			url:'/done',
			views:{
				done:{
					templateUrl:'view/done.html'
				}
			}
		}).state('book',{
			url:'/book',
			views:{
				book:{
					templateUrl:'view/book.html'
				}
			}
		}).state('book.detail',{
			url:'/detail:id',
			views:{
				bookDetail:{
					templateUrl:'view/bookdetail.html',
				}
			}

		}).state('movie',{
			url:'/movie',
			views:{
				movie:{
					templateUrl:'view/movie.html'
				}
			}
		}).state('music',{
			url:'/music',
			views:{
				music:{
					templateUrl:'view/music.html'
				}
			}}).state('buy',{
			url:'/buy',
			views:{
				buy:{
					templateUrl:'view/buy.html',
					controller:'buyCtrl'
				}
			}
		});
		$urlRouterProvider.otherwise('/undone');
	}])

})(angular)