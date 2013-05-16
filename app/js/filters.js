'use strict';

/* Filters */

angular.module('ldapgroupsFilters', [])
    .filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }])
    .filter('escape', function() {
        return window.escape;
    })
;
