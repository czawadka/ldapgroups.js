'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/groups', {templateUrl: 'partials/group-list.html', controller: 'GroupsCtrl'});
    $routeProvider.when('/group/:groupName', {templateUrl: 'partials/group-details.html', controller: 'GroupCtrl'});
    $routeProvider.otherwise({redirectTo: '/groups'});
  }]);
