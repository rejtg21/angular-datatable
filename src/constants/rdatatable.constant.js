/**
 * Angular datatable constants
 * @author Rej Mediodia
 * @copyright 2016
 * https://github.com/rejtg21
 */

(function() {
    'use strict';

    var rdtConfig = {};
    rdtConfig.LIMIT = 10; // default limit

    rdtConfig.VIEW = {
        'ALL' : 'All',
        'SHOW' : 'Show',
        'SHOWING' : 'Showing {{from}} to {{to}} of {{total}} entries',
        'SHOW_VALUE' : [10, 20, 50, 100]
    }

    angular.module('ngDatatable')
        .constant('RDT_CONFIG', rdtConfig);
})();
