'use strict';

app.factory('auth', function($http, $state){
	var currentUser = null;
	return {
		submitLogin : function (email, password){
			return $http.post("/api/login", {'email' : email, 'password' : password})
			.then(function(data){
				currentUser = data.data;
				console.log(currentUser)
				$state.go('home');
			});
		},
		submitSignup: function (email, password) {
			return $http.post('/api/signup', {'email': email, 'password': password})
			.then(function(data){
				console.log(data.status)
				currentUser = data.data;
				$state.go('stories');
			});
		},
		logout: function(){
			return $http.get('/api/logout')
			.then(function(data){
				currentUser = null;
				$state.go('home');
			})
		},
		getCurrentUser: function(){
			return currentUser;
		}
	};
});

