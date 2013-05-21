var flashModule = angular.module('flash', ['ui.bootstrap'])
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
    .directive('flash', ['$timeout', '$log', 'Flash', 'flashDuration', function ($timeout, $log, Flash, flashDuration) {
        return {
            restrict: 'A',
            template: '<div style="display: none" ng-show="visible">'
                    +'<div alert type="flash.type" close="hide()"><div ng-transclude></div></div>'
                +'</div>',
            replace: true,
            transclude: true,
            compile: function (tElement, tAttrs) {
                var duration = parseInt( tAttrs.duration, 10 );
                if (isNaN(duration)) {
                    if (tAttrs.duration) {
                        $log.warn("Flash's 'duration' attribute has value '"+tAttrs.duration+"' which is not a number. Defaulting to "+flashDuration);
                    }
                    duration = flashDuration;
                }
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
                            if (duration) {
                                timeout = $timeout(hideFlash, duration);
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