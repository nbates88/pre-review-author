'use strict';

app.controller("SignupCtrl", function($scope, auth) {
	$scope.submitSignup = auth.submitSignup;
});