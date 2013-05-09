angular.module('breadcrumbs', [])
    .factory('Breadcrumbs', function ($rootScope, $log) {
        var breadcrumbs = {},
            create = function (breadcrumbsId) {
                var data = [],
                    updateCount = 0,
                    fireBreadcrumbsChanged = function () {
                        if (updateCount == 0) {
                            $rootScope.$broadcast('breadcrumbsChanged_' + breadcrumbsId);
                        }
                    };
                return {
                    beginUpdate: function () {
                        updateCount++;
                        return this;
                    },
                    endUpdate: function () {
                        updateCount--;
                        fireBreadcrumbsChanged();
                        return this;
                    },
                    push: function (href, label) {
                        data.push({"href": href, "label": label});
                        fireBreadcrumbsChanged();
                        return this;
                    },
                    clear: function () {
                        data = [];
                        fireBreadcrumbsChanged();
                        return this;
                    },
                    list: function () {
                        return angular.copy(data);
                    }
                }
            };

        return {
            /**
             * Get breadcrumbs instance for `breadcrumbsId`
             * @param breadcrumbsId
             * @returns {*}
             */
            get: function (breadcrumbsId) {
                breadcrumbsId = breadcrumbsId || '';
                if (angular.isUndefined(breadcrumbs[breadcrumbsId]))
                    breadcrumbs[breadcrumbsId] = create(breadcrumbsId);
                return breadcrumbs[breadcrumbsId];
            }
        };
    })
    .directive('breadcrumbs', function (Breadcrumbs) {
        return {
            restrict: 'A',
            template: '<ul class="breadcrumb">' +
                '<li ng-repeat=\'bc in breadcrumbs\' ng-class="{\'active\': {{$last}} }">' +
                    '<a ng-href="{{bc.href}}" ng-show="!$last">{{bc.label}}</a>' +
                    '<span class="divider" ng-show="!$last">|</span>' +
                    '<span ng-show="$last">{{bc.label}}</span>' +
                '</li></ul>',
            replace: true,
            compile: function (tElement, tAttrs) {
                return function ($scope, $elem, $attr) {
                    var breadcrumbsId = $attr.breadcrumbs || '',
                        reloadBreadcrumbs = function() {
                            $scope.breadcrumbs = Breadcrumbs.get(breadcrumbsId).list();
                        };
                    reloadBreadcrumbs();
                    $scope.$on('breadcrumbsChanged_'+breadcrumbsId, function () {
                        reloadBreadcrumbs();
                    });
                }
            }
        };

    });