'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services'])
    .controller('GroupsCtrl', ['$scope', 'Group', function($scope, Group) {
        $scope.groups = Group.query();
    }])
    .controller('GroupCtrl', ['$scope', '$routeParams', 'Group', function($scope, $routeParams, Group) {
        $scope.group = Group.get({groupName: $routeParams.groupName});
    }])
    .controller('NotFoundCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.$location = $location;
    }])
;