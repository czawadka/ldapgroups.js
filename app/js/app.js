'use strict';


// Declare app level module which depends on filters, and services
angular.module('ldapgroups', ['ldapgroupsFilters', 'ldapgroupsServices', 'ldapgroupsDirectives', 'ldapgroupsControllers', 'breadcrumbs'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/groups', {templateUrl: 'partials/group-list.html', controller: 'GroupsCtrl'});
        $routeProvider.when('/groups/:groupName', {templateUrl: 'partials/group-details.html', controller: 'GroupCtrl'});
        $routeProvider.when('', {redirectTo: '/groups'});
        $routeProvider.otherwise({templateUrl: 'partials/error-notfound.html', controller: 'NotFoundCtrl'});
    }])
    .factory('MainBreadcrumbs', ['Breadcrumbs', function(Breadcrumbs) {
        var base = Breadcrumbs.get();
        var extra = {
            groups: function() {
                return this.beginUpdate()
                    .clear().push('#/group', 'Groups')
                    .endUpdate();
            },
            group: function(groupName) {
                return this.beginUpdate()
                    .groups().push('#/group/'+groupName, groupName)
                    .endUpdate();
            },
            notFound: function() {
                return this.beginUpdate()
                    .clear().push('#/notFound', "Not found")
                    .endUpdate();
            }};
        return angular.extend(extra, base);
    }])
;
