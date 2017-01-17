/**
 * Angular datatable footer
 * will handle footer page of the datatable pagination and views
 * @author Rej Mediodia
 * @copyright 2016
 * https://github.com/rejtg21
 */

(function() {
    'use strict';

    angular
        .module('ngDatatable')
        .directive('rview', rview);

    rview.$inject = ['RDT_CONFIG', '$compile'];
    /* @ngInject */
    function rview(RDT_CONFIG, $compile) {
        var directive = {
            restrict: 'E',
            // template: template,
            scope: {
            },
            link: linkFunc,
            require: '^rdatatable'
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            scope.from = 1;
            scope.to = 10;
            scope.limit = ctrl.limit;
            scope.viewOptions = ctrl.views || RDT_CONFIG.VIEW.SHOW_VALUE;
            scope.triggerFilter = triggerFilter;

            scope.$watch(function() {
                return ctrl.total;
            }, function(val){
                scope.total = ctrl.total;
            });

            var showing = RDT_CONFIG.VIEW.SHOWING;
            var html = (
                '<div class="form-inline form-group pull-left">' +
                  showing + ' | ' +
                  RDT_CONFIG.VIEW.SHOW +
                  ' <select class = "form-control" id="rdt-pagination" ng-change = "triggerFilter()" ng-model="limit"'+
                  'ng-options = "data for data in viewOptions">' +
                  '</select>' +
                '</div>'
            );

            el.html(html);
            $compile(el.contents())(scope);

            function triggerFilter() {
                ctrl.limit = scope.limit;
                ctrl.filter();
            }
        }


    }

    Controller.$inject = ['dependencies'];

    /* @ngInject */
    function Controller(dependencies) {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();
