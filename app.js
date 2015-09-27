var App = angular.module('App', ['ngRoute','elasticsearch']);

App.config(function($routeProvider,$httpProvider,$sceProvider){
    $routeProvider.
    when('/', {
        templateUrl: 'top.html',
    }).
    when('/url', {
        controller: 'Urls',
        templateUrl: 'urls.html',
    }).
    when('/url/regist', {
        controller: 'Regist',
        templateUrl: 'regist.html',
    }).
    when('/graph/:name', {
        controller: 'getGraph',
        templateUrl: 'graph.html',
    }).
    otherwise({
        redirectTo: '/'
    });
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;application/json;charset=utf-8';
    $sceProvider.enabled(false);
});

App.service('client', function(esFactory){
  return esFactory({
    host: '192.168.70.15:9200',
    apiVersion: '2.0',
    log: 'trace'
  });
});

App.controller('Regist',function($scope, client, esFactory){
  $scope.types = ['kibana', 'cloudwatch'];
  $scope.checked = { type: 'kibana' };

  $scope.registUrl = function(){
    client.create({
      index: 'graphs',
      type: $scope.checked.type,
      body: {
        url: $scope.url,
        path: $scope.path,
        description: $scope.description,
        name: $scope.name
      }
    }, function(error,response){
      if ( error ) {
        console.log('error');
      }
      else {
        console.log('success');
      }

    });
  }
});

App.controller('Urls', function($scope,$location,client,esFactory){
  client.search({
    index: 'graphs'
  },function(error,response){
    $scope.urls = response.hits.hits;
  });

  $scope.deleteUrl = function(){
    if ( !window.confirm('Really Delete?') ){
      return;
    }
    var deleteUrls = $scope.urls.filter(function(url){
      return url.wantDelete;
    });

    var requestBody = [];
    deleteUrls.forEach(function(url){
      var requestData = { delete: { _index: 'graphs', _type: url._type, _id: url._id } };
      requestBody.push( requestData );
    });

    client.bulk({
      body: requestBody
    }, function(error,response){
      if ( error ) {
        alert('Delete Error!!!!');
      }
      else{
        $location.path('/');
      }
    });
  }
});

App.controller('sideNavi', function($scope,client,esFactory){
  client.search({
    index: 'graphs',
  },function(error,response){
    var urls = response.hits.hits;

    $scope.kibana = urls.filter(function(url){
      return url._type == 'kibana';
    });

    $scope.cloudwatch = urls.filter(function(url){
      return url._type == 'cloudwatch';
    });
  });
});


App.controller('getGraph', function($scope,$location,client,esFactory){
  var id = $location.$$path.match(/\/graph\/(.*)/)[1];

  client.get({
    index: 'graphs',
    type: 'kibana',
    id: id
  }, function(error,response){
    if ( error ) {
      console.log('get Error!!');
      return;
    }
    $scope.item = response._source;
  });
});

