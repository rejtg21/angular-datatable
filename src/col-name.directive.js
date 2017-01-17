/**
 * Angular datatable column name identifier
 * to identify what will be the request parameter to be sent&received.
 * @author Rej Mediodia
 * @copyright 2016
 * https://github.com/rejtg21
 */
(function() {
    'use strict';

    angular
        .module('ngDatatable')
        .directive('colName', colName);

    /* @ngInject */
    function colName() {
        // specify the number of column
        var ctr = 0;
        var directive = {
            restrict: 'A',
            scope: {
                'colName': '@',
                'rsort': '@'
            },
            link: linkFunc,
            require: '^rdatatable'
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            var clickCtr = 0,
            columnName = scope.colName;
            // set the name of column to inform the rdatatable(parent) & other siblings
            ctrl.columns[ctr] = columnName;
            ctr++;
            //  SORTING
            // if false stop generating event for sorting
            if(scope.rsort === 'false') return;
            // initialize sort depending on what specified
            ctrl.sortables[columnName] = scope.rsort || 'asc'; // if no specified by default asc

            // on click identify wether asc or desc
            el.on('click', onClick);

            function onClick() {
                // specify what sort will be the column
                ctrl.sortables[columnName] = (clickCtr%2 == 1) ? 'asc' : 'desc'; // if odd asc else desc
                clickCtr++;
            }
        }
    }

})();
