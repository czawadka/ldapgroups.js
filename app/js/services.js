'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var myAppServices = angular.module('myApp.services', ['ngResource'])
    .value('version', '0.1')
    .value('groupUrl', 'rest/groups/:groupName')
    .value('groupListParams', {groupName:null})
    .factory('Group', function($resource, groupUrl, groupListParams){
        return $resource(groupUrl, {}, {
            query: {method:'GET', params:groupListParams, isArray:true}
        });
    })
;
