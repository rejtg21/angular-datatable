/**
 * Angular datatable searchables
 * will handle searchables specified by user to be sent/request.
 * @author Rej Mediodia
 * @copyright 2016
 * https://github.com/rejtg21
 */

(function() {
    'use strict';

    angular
        .module('ngDatatable')
        .directive('rsearch', rsearch);

    /* @ngInject */
    function rsearch() {
        // column count
        var ctr = 0;
        var directive = {
            restrict: 'A',
            scope: {
                'rsearch': '@'
            },
            link: linkFunc,
            // controller: RSearchController,
            // controllerAs: 'rsc',
            // bindToController: true,
            require : '^rdatatable', // must be insider rdatatable
        };

        return directive;


        function linkFunc(scope, el, attr, ctrl) {
            var columnName = ctrl.columns[ctr];
            ctr++;

            var ev = scope.rsearch || 'keyup';//event default is keyup for inputs
            el.on(ev, onEvent);

            function onEvent() {
                ctrl.searchables[columnName] = el.val();
            }
        }
    }
})();
