'use strict';

/* Directives */

var module = angular.module('ldapgroupsDirectives', []);
module.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
module.directive('activeLinkClass', ['$location', function($location) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, controller) {
            var clazz = attrs.activeLinkClass;
            scope.location = $location;

            scope.$watch('location.path()', function(newPath) {
                var path = (element.tagName=='A' ? element : element.find('A')).attr('href');
                path = path.substring(1); //hack because path does bot return including hashbang
                var rePath = new RegExp("^"+path);

                if (rePath.test(newPath)) {
                    element.addClass(clazz);
                } else {
                    element.removeClass(clazz);
                }
            });
        }

    };
  }]);
