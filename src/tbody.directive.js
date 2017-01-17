/**
 * Angular datatable data rows
 * will handle data response sent by specified url to request
 * @author Rej Mediodia
 * @copyright 2016
 * https://github.com/rejtg21
 */

(function() {
    'use strict';

    angular
        .module('ngDatatable')
        .directive('tbody', tbody);

    tbody.$inject = ['$compile'];
    /* @ngInject */
    function tbody($compile) {
        var directive = {
            restrict: 'E',
            link: linkFunc,
            require: '^rdatatable'
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            var columns = '';
            // scope.data = ctrl.data;
            scope.$watch(function() {
                return ctrl.data
            }, function(val) {
                scope.data = val || [];
            });

            scope.showHtml = ctrl.showHtml;
            // set the columns
            // can be change to tbc.data[columnName]
            for(var x=0; x<ctrl.columns.length; x++) {
                columns += '<td ng-bind-html = "::showHtml(data2.'+ ctrl.columns[x] +')"></td>';
            }

            var html = (
                '<tr ng-repeat = "data2 in data">' +
                    columns +
                '</tr>' +
                '<tr ng-if ="data.length == 0">' +
                    '<td colspan = "5" style = "text-align:center;">No records available</td>' +
                '</tr>'
            );

            el.html(html);
            $compile(el.contents())(scope);
        }

    }

    TBodyController.$inject = [];

    /* @ngInject */
    function TBodyController() {
        var vm = this;
        // console.log(vm.data);
    }
})();
