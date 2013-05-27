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
            var icon,
                infoClass;
            if (!group.syncError) {
                icon = 'icon-question-sign';
                infoClass = '';
            } else if (group.syncError != "OK") {
                icon = 'icon-exclamation-sign';
                infoClass = 'alert-error';
            } else if (group.dateModified > group.dateSynchronized) {
                icon = 'icon-time';
                infoClass = 'alert-info';
            } else {
                icon = 'icon-ok';
                infoClass = 'alert-success';
            }
            var date = group.dateSynchronized ? $filter('dateDefault')(group.dateSynchronized) : '<em>no sync yet</em>';
            var description = group.syncDescription ? group.syncDescription : "";
            return '<i class="'+icon+' '+infoClass+'"></i> ' + date + ' <span class="syncDescription '+infoClass+'">'+description+'</span>';
        }
    }])
;
