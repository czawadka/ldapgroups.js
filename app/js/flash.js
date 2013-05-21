var flashModule = angular.module('flash', [])
    .factory('Flash', ["$rootScope", function($rootScope) {
        var entry = {
            message: "",
            type: ""
        };
        var actions = {
            set: function(type, message) {
                entry.message = message;
                entry.type = type;
                $rootScope.$broadcast("flashChanged", this);
            },
            get: function() {
                return entry;
            },
            success: function(message) {
                this.set("success", message);
            },
            info: function(message) {
                this.set("info", message);
            },
            error: function(message) {
                this.set("error", message);
            }
        };
        return actions;
    }])
    .value('flashDuration', 3000)
    .directive('flash', ['Flash', '$timeout', 'flashDuration', function (Flash, $timeout, flashDuration) {
        return {
            restrict: 'A',
            compile: function (tElement, tAttrs) {
                return function ($scope, $elem, $attr) {
                    var timeout,
                        reloadFlash = function() {
                            $scope.flash = Flash.get();
                            $scope.visible = ($scope.flash.message != '');
                            cancelTimeout();
                            setTimeout();
                        },
                        hideFlash = function() {
                            $scope.visible = false;
                            cancelTimeout();
                        },
                        cancelTimeout = function() {
                            if (timeout) {
                                $timeout.cancel(timeout);
                                timeout = null;
                            }
                        },
                        setTimeout = function() {
                            if (flashDuration) {
                                timeout = $timeout(hideFlash, flashDuration);
                            }
                        }
                        ;
                    $scope.$on('flashChanged', function(){
                        reloadFlash();
                    });
                    $scope.$on('$routeChangeSuccess', function(){
                        hideFlash();
                    });

                    $scope.hide = hideFlash;
                    reloadFlash();
                }
            }
        };

    }]);