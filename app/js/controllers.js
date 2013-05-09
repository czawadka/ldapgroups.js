'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services'])
    .controller('GroupsCtrl', ['$scope', 'Group', 'MainBreadcrumbs', function($scope, Group, MainBreadcrumbs) {
        $scope.groups = Group.query();
        MainBreadcrumbs.groups();
    }])
    .controller('GroupCtrl', ['$scope', '$routeParams', 'Group', 'MainBreadcrumbs', function($scope, $routeParams, Group, MainBreadcrumbs) {
        $scope.group = Group.get({groupName: $routeParams.groupName}, function() {
            MainBreadcrumbs.group($scope.group.name);
        });
    }])
    .controller('NotFoundCtrl', ['$scope', '$location', 'MainBreadcrumbs', function($scope, $location, MainBreadcrumbs) {
        $scope.$location = $location;
        MainBreadcrumbs.notFound();
    }])
;