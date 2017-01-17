/**
 * Angular datatable header
 * will handle other details above the table
 * @author Rej Mediodia
 * @copyright 2016
 * https://github.com/rejtg21
 */

(function() {
    'use strict';

    angular
        .module('ngDatatable')
        .directive('rheader', rheader);

    /* @ngInject */
    function rheader() {
        var directive = {
            restrict: 'E',
            template: template,
            transclude: true,
            scope: {
                'search' : '<?'
            },
            link: linkFunc,
            controller: RHeaderController,
            controllerAs: 'rhc',
            bindToController: true,
            require: '^rdatatable', // must be insider rdatatable
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }

        function template() {
            return (
                '<div class = "row">' +
                  '<div class = "col-md-4">' +
                    '<rview></rview>' +
                  '</div>' +
                  '<div class="col-md-8" ng-transclude>' +
                  '</div>' +
                '</div>'
            );
        }
    }

    RHeaderController.$inject = [];

    /* @ngInject */
    function RHeaderController() {
        var vm = this;

    }
})();
