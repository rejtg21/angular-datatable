/**
 * Angular datatable reset button
 * a button that will clear limits and filters of datatable
 * @author Rej Mediodia
 * @copyright 2016
 * https://github.com/rejtg21
 */

(function() {
    'use strict';

    angular
        .module('ngDatatable')
        .directive('rdtReset', rdtReset);

    /* @ngInject */
    function rdtReset() {
        var directive = {
            restrict: 'A',
            scope: {
                'rdtReset': '@'
            },
            link: linkFunc,
            // controller: RDTResetController,
            // controllerAs: 'vm',
            // bindToController: true,
            require : '^rdatatable', // must be insider rdatatable
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            // set default event as click if not specified
            scope.rdtReset = scope.rdtReset || 'click';

            el.on(scope.rdtReset, function(){
                console.log('reset');
                ctrl.reset();
            });
        }
    }

    // RDTResetController.$inject = ['dependencies'];
    //
    // /* @ngInject */
    // function RDTResetController(dependencies) {
    //     var vm = this;
    //
    // }
})();
