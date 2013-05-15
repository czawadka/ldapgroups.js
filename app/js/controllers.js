'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services'])
    .controller('GroupsCtrl', ['$scope', 'Group', 'MainBreadcrumbs', function($scope, Group, MainBreadcrumbs) {
        $scope.groups = Group.query();
        MainBreadcrumbs.groups();

        $scope.addGroup = function() {
            var newGroup = new Group({name: $scope.groupName});
            newGroup.$save();
            $scope.groups.push(newGroup);

            $scope.groupName = "";
        }
    }])
    .controller('GroupCtrl', ['$scope', '$routeParams', 'Group', 'MainBreadcrumbs', function($scope, $routeParams, Group, MainBreadcrumbs) {
        $scope.group = Group.get({groupName: $routeParams.groupName});
        MainBreadcrumbs.group($routeParams.groupName);
    }])
    .controller('NotFoundCtrl', ['$scope', '$location', 'MainBreadcrumbs', function($scope, $location, MainBreadcrumbs) {
        $scope.$location = $location;
        MainBreadcrumbs.notFound();
    }])
;