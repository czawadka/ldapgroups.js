'use strict';

/* Controllers */

angular.module('ldapgroupsControllers', ['ldapgroupsServices'])
    .controller('GroupsCtrl', ['$scope', 'Group', 'MainBreadcrumbs', 'Flash',
        function($scope, Group, MainBreadcrumbs, Flash) {

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
    .controller('GroupCtrl', ['$scope', '$routeParams', 'Group', 'MainBreadcrumbs', 'Flash',
        function($scope, $routeParams, Group, MainBreadcrumbs, Flash) {

        $scope.group = Group.get({groupName: $routeParams.groupName});
        MainBreadcrumbs.group($routeParams.groupName);

        $scope.addMember = function() {
            var updatedGroup = angular.extend($scope.group);
            updatedGroup.members.push($scope.newMember);
            updatedGroup.$save(
                function(group) {
                    Flash.success("New member "+$scope.newMember+" has been added");
                    $scope.group = group;
                    $scope.newMember = "";
                },
                function(response) {
                    Flash.error("Error adding member: "+angular.toJson(response));
                });
        };

        $scope.removeMember = function(member) {
            var updatedGroup = angular.extend($scope.group);
            var idx = updatedGroup.members.indexOf(member);
            if (idx>=0) {
                updatedGroup.members.splice(idx, 1);
                updatedGroup.$save(
                    function(group) {
                        Flash.success("Member "+member+" has been removed");
                        $scope.group = group;
                    },
                    function(response) {
                        Flash.error("Error removing member: "+angular.toJson(response));
                    });
            }
        };
    }])
    .controller('NotFoundCtrl', ['$scope', '$location', 'MainBreadcrumbs', function($scope, $location, MainBreadcrumbs) {
        $scope.$location = $location;
        MainBreadcrumbs.notFound();
    }])
;