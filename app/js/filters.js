'use strict';

/* Filters */

angular.module('ldapgroupsFilters', [])
    .filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }])
    .filter('encodeURIComponent', function() {
        return encodeURIComponent;
    })
    .filter('dateDefault', ['$filter', function($filter) {
        return function(date) {
            return $filter('date')(date, 'medium');
        }
    }])
    .filter('dateModified', ['$filter', function($filter) {
        return function(group) {
            var date = $filter('dateDefault')(group.dateModified);
            return date;
        }
    }])
    .filter('dateSynchronized', ['$filter', function($filter) {
        return function(group) {
            var iconClass = group.dateSynchronized == group.dateModified ? 'icon-ok' : 'icon-exclamation-sign';
            var date = group.dateSynchronized ? $filter('dateDefault')(group.dateSynchronized) : '<em>no sync</em>';
            return '<i class="'+iconClass+'"></i> ' + date;
        }
    }])
;
