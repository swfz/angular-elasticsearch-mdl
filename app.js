var App = angular.module('App', ['ngRoute','elasticsearch']);

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
    when('/url', {
        controller: 'Urls',
        // controller: 'getUrlsCtrl',
        templateUrl: 'urls.html',
    }).
    when('/url/regist', {
        // controller: 'getGraphs',
        controller: 'Regist',
        templateUrl: 'regist.html',
    }).
    when('/graph', {
        controller: 'Urls',
        // controller: 'getUrlsCtrl',
        templateUrl: 'urls.html',
    }).
    when('/graph/:name', {
        controller: 'getGraph',
        templateUrl: 'frame.html',
    }).
    otherwise({
        redirectTo: '/'
    });
});

App.service('client', function(esFactory){
  return esFactory({
    host: '192.168.70.15:9200',
    apiVersion: '2.0',
    log: 'trace'
  });
});

App.controller('Regist',function($scope, client, esFactory){
  $scope.types=('kibana cloudwatch').split(' ').map(function(state){ return { value: state }});

  $scope.registUrl = function(){
    console.log($scope);
  }
});




