'use strict';


// Declare app level module which depends on filters, and services
angular.module('ldapgroups', ['ldapgroupsFilters', 'ldapgroupsServices', 'ldapgroupsDirectives', 'ldapgroupsControllers',
        'breadcrumbs', 'flash', 'ngSanitize'])
    .constant('paths', {
        "groups": '/groups',
        "notFound": '/notFound',
        "about": '/about'
    })
    .config(['$routeProvider', 'paths', function ($routeProvider, paths) {
        $routeProvider.when(paths.groups, {templateUrl: 'partials/group-list.html', controller: 'GroupsCtrl'});
        $routeProvider.when(paths.groups+'/:groupName', {templateUrl: 'partials/group-details.html', controller: 'GroupCtrl'});
        $routeProvider.when(paths.about, {templateUrl: 'partials/about.html', controller: 'AboutCtrl'});
        $routeProvider.when('', {redirectTo: paths.groups});
        $routeProvider.otherwise({templateUrl: 'partials/error-notfound.html', controller: 'NotFoundCtrl'});
    }])
    .run(['$rootScope', 'paths', function ($rootScope, paths) {
        $rootScope.paths = paths;
    }])
    .factory('MainBreadcrumbs', ['Breadcrumbs', 'paths', function(Breadcrumbs, paths) {
        var base = Breadcrumbs.get();
        var extra = {
            start: function() {
                return this.beginUpdate()
                    .clear()
                    .endUpdate();
            },
            groups: function() {
                return this.beginUpdate()
                    .start()
                    .push('#'+paths.groups, 'Groups')
                    .endUpdate();
            },
            group: function(groupName) {
                return this.beginUpdate()
                    .groups()
                    .push('#'+paths.groups+'/'+groupName, groupName)
                    .endUpdate();
            },
            notFound: function() {
                return this.beginUpdate()
                    .start()
                    .push('#'+paths.notFound, "Not found")
                    .endUpdate();
            },
            about: function() {
                return this
                    .beginUpdate()
                    .start()
                    .push('#'+paths.about, "About")
                    .endUpdate();
            }
            };
        return angular.extend(extra, base);
    }])
;
