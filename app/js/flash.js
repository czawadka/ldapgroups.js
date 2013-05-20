angular.module('flash', [])
    .factory('Flash', ["$rootScope", function($rootScope) {
        var entry = {message: "", type: ""};
        var actions = {
            set: function(type, message) {
                entry.message = message;
                entry.type = type;
                $rootScope.$broadcast("flashChanged", this);
            },
            get: function() {
                var self = this;
                return angular.extend(entry, {$clear: function() {self.clear();}});
            },
            clear: function() {
              this.set('', '');
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
    .directive('flash', ['Flash', '$timeout', function (Flash, $timeout) {
        return {
            restrict: 'A',
            compile: function (tElement, tAttrs) {
                return function ($scope, $elem, $attr) {
                    var clearFlash = function() {
                            $scope.flash = {};
                            resetTimeout();
                        },
                        timeout,
                        resetTimeout = function() {
                            if (timeout) {
                                $timeout.cancel(timeout);
                                timeout = null;
                            }
                        };
                    $scope.$on('flashChanged', function(){
                        $scope.flash = Flash.get();
                        resetTimeout();
                        timeout = $timeout(clearFlash, 5000);
                    });
                    $scope.$on('$routeChangeSuccess', function(){
                        clearFlash();
                    });
                    clearFlash();
                }
            }
        };

    }]);