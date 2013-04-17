'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource'])
    .value('version', '0.1')
    .factory('Group', function($resource){
        return $resource('rest/groups/:groupName.json', {}, {
            query: {method:'GET', params:{groupName:'groups'}, isArray:true}
        });
    })
;
