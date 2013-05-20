'use strict';

/* Controllers */

angular.module('ldapgroupsControllers', ['ldapgroupsServices'])
    .controller('GroupsCtrl', ['$scope', 'Group', 'MainBreadcrumbs', 'Flash', function($scope, Group, MainBreadcrumbs, Flash) {
        $scope.groups = Group.query();
        MainBreadcrumbs.groups();

        $scope.addGroup = function() {
            Group.create({name: $scope.groupName},
                function(newGroup) {
                    $scope.groups.push(newGroup);
                    $scope.groupName = "";
                    Flash.success("New group "+newGroup.name+" has been added");
                },
                function(response) {
                    Flash.error("Error adding group "+angular.toJson(response));
                });
        };

        $scope.removeGroup = function(group) {
            group.$delete(
                function() {
                    var idx = $scope.groups.indexOf(group);
                    if (idx>=0) {
                        $scope.groups.splice(idx, 1);
                    }
                    Flash.info("Group "+group.name+" has been removed");
                },
                function(response) {
                    Flash.error("Error removing group "+angular.toJson(response));
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