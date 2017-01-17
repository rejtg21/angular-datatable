/**
 * Angular datatable search button
 * will trigger the searching of datatables based on filters
 * @author Rej Mediodia
 * @copyright 2016
 * https://github.com/rejtg21
 */

(function() {
    'use strict';

    angular
        .module('ngDatatable')
        .directive('rdtSearch', rdtSearch);

    /* @ngInject */
    function rdtSearch() {
        var directive = {
            restrict: 'A',
            scope: {
                'rdtSearch': '@' // event
            },
            link: linkFunc,
            // controller: RDTSearchController,
            // controllerAs: 'vm',
            // bindToController: true,
            require : '^rdatatable', // must be insider rdatatable
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            // set default event as click if not specified
            scope.rdtSearch = scope.rdtSearch || 'click';
            el.on(scope.rdtSearch, function(){
                console.log('search');
                ctrl.filter();
            });
        }
    }

    // RDTSearchController.$inject = ['dependencies'];
    //
    // /* @ngInject */
    // function RDTSearchController(dependencies) {
    //     var vm = this;
    //
    //     activate();
    //
    //     function activate() {
    //
    //     }
    // }
})();
