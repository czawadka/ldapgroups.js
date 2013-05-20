'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var ldapgroupsServices = angular.module('ldapgroupsServices', ['ngResource'])
    .value('version', '0.1')
    .value('groupApiUrl', 'api/groups/:groupName')
    .factory('Group', ['$resource', 'groupApiUrl', function($resource, groupApiUrl){
        return $resource(groupApiUrl, {groupName: '@name'}, {
            query: {method:'GET', params: {groupName: ''}, isArray:true},
            create: {method:'POST', params: {groupName: ''}},
            save: {method:'PUT'}
        });
    }])
;
