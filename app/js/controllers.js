'use strict';

/* Controllers */

angular.module('ldapgroupsControllers', ['ldapgroupsServices'])
    .controller('GroupsCtrl', ['$scope', 'Group', 'MainBreadcrumbs', '$log', function($scope, Group, MainBreadcrumbs, $log) {
        $scope.groups = Group.query();
        MainBreadcrumbs.groups();

        $scope.addGroup = function() {
            Group.create({name: $scope.groupName},
                function(newGroup) {
                    $scope.groups.push(newGroup);
                    $scope.groupName = "";
                },
                function(response) {
                    $log.log( response, "error adding group" );
                });
        };

        $scope.removeGroup = function(group) {
            group.$delete(
                function() {
                    var idx = $scope.groups.indexOf(group);
                    if (idx>=0) {
                        $scope.groups.splice(idx, 1);
                    }
                },
                function(response) {
                    $log.log( "error removing group: "+response );
                });
        };
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