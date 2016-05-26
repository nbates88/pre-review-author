'use strict';

var app = angular.module('auther', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.when('/api/auth/:provider', function () {
  	console.log("going to provider");
  	window.location.reload();
  });
  $urlRouterProvider.otherwise('/');
});


  