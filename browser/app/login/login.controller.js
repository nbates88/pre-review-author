'use strict';

app.controller('LoginCtrl', function($scope, auth){
	$scope.submitLogin = auth.submitLogin;
})