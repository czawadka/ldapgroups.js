'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.when('/groups', {templateUrl: 'partials/group-list.html', controller: 'GroupsCtrl'});
    $routeProvider.otherwise({redirectTo: '/groups'});
  }]);
