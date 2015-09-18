var App = angular.module('App', ['ngRoute']);

App.config(function($routeProvider){
    $routeProvider.
    when('/', {
        templateUrl: 'top.html',
    }).
    when('/search/sandbox', {
        templateUrl: 'log/search.html',
    }).
    when('/search/production', {
        templateUrl: 'log/search.html',
    }).
    when('/url/regist', {
        // controller: 'getGraphs',
        controller: 'App',
        templateUrl: 'regist.html',
    }).
    when('/graph', {
        controller: 'getGraphs',
        // controller: 'getUrlsCtrl',
        templateUrl: 'graphs.html',
    }).
    when('/graph/:name', {
        controller: 'getGraph',
        templateUrl: 'frame.html',
    }).
    otherwise({
        redirectTo: '/'
    });
});
