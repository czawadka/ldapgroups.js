'use strict';

/* Controllers */

angular.module('ldapgroupsControllers', ['ldapgroupsServices'])
    .controller('GroupsCtrl', ['$scope', 'Group', 'MainBreadcrumbs', 'Flash',
        function($scope, Group, MainBreadcrumbs, Flash) {

        $scope.groups = [];
        Group.query(
            function(groups) {
                $scope.groups = groups;
            },
            function(response) {
                Flash.error("Error fetching groups: "+angular.toJson(response));
            }
        );
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

        var groupName = $routeParams.groupName;
        groupName = decodeURIComponent(groupName); // decode again because it was double encoded to remove '/' problem
        $scope.group = {name: groupName};

        Group.get({"groupName": groupName},
            function(group) {
                $scope.group = group;
            },
            function(response) {
                Flash.error("Error fetching group "+angular.toJson(response));
            }
        );
        MainBreadcrumbs.group(groupName);

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
    .controller('AboutCtrl', ['MainBreadcrumbs', function(MainBreadcrumbs) {
        MainBreadcrumbs.about();
    }])
;