var App = angular.module('App', ['ngRoute','elasticsearch']);

App.config(function($routeProvider,$httpProvider){
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
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;application/json;charset=utf-8';
});

App.service('client', function(esFactory){
  return esFactory({
    host: '192.168.70.15:9200',
    apiVersion: '2.0',
    log: 'trace'
  });
});

App.controller('Regist',function($scope, client, esFactory){
  // $scope.types=('kibana cloudwatch').split(' ').map(function(state){ return { value: state }});
  $scope.types = ['kibana', 'cloudwatch'];
  $scope.checked = { type: 'kibana' };

  $scope.registUrl = function(){
    console.log($scope.checked.type);
    console.log($scope.path);
    client.create({
      index: 'graphs',
      type: $scope.checked.type,
      // id: '1',
      body: {
        url: $scope.url,
        path: $scope.path,
        description: $scope.description,
        name: $scope.name
      }
    }, function(error,response){
      if ( error ) {
        console.log(error);
        console.log(response);
        console.log('error');
      }
      else {
        console.log(error);
        console.log(response);
        console.log('success');
      }

    });
  }
});




