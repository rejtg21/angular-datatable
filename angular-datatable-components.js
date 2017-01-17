/**
*   A simple Angular Datatable like jquery datatable
*   @author Rej Mediodia
*   @copyright 2016
*/
(function() {
    'use strict';

    angular
        .module('ngDatatable', [])
        .constant('rdtConfig', {
            'limit' : 10,
        })
        .component('rdatatable', rdatatable)
        .component('rheader', rheader)
        .component('rpagination', rpagination);

        /**
        *   Datatable Element
        */
        function rdatatable() {
            var component = {
                bindings: {
                    'url' : '@? ', // link
                    'limit' : '<?',
                    'entry' : '<?', // default top
                },
                transclude: true,
                template: template,
                controller: RDatatableController,
            };

            return component;

            function template() {
                return (
                    '<div class = "rdatatable col-lg-12" ng-transclude>' +
                    '</div>' +
                    '<rpagination></rpagination>'
                );
            }
        }

        RDatatableController.$inject = ['rdtConfig'];

        /* @ngInject */
        function RDatatableController(el, attr, rdtConfig) {
            var vm = this;
            vm.config = rdtConfig;

            console.log(vm);
        }

        /**
        *   Datatable Header
        */
        function rheader() {
            var component = {
                restrict: 'E',
                bindings: {

                },
                controller: RHeaderController,
                transclude: true,
                template: template,
                require : {
                    rdCtrl : '^rdatatable' // must be insider rdatatable
                }
            };

            return component;

            function template() {
                return (
                    '<div class = "row">' +
                      '<div class = "col-md-2">' +
                      '<div class="form-inline pull-left">' +
                        ' Show ' +
                        '<select class = "form-control" id="rdt-pagination">' +
                          '<option>All</option>' +
                          '<option>50</option>' +
                        '</select> Entries' +
                      '</div>' +
                      '</div>' +
                      '<div class="col-md-10" ng-transclude>' +
                      '</div>' +
                    '</div>'
                );
            }
        }

        RHeaderController.$inject = [];

        function RHeaderController(el, attr) {
            var vm = this;
        }

        /**
        * Datatable Pagination
        */
        function rpagination() {
            var component = {
                bindings: {

                },
                controller: RPaginationController,
                transclude: true,
                template: template,
                require : {
                    rdCtrl : '^rdatatable' // must be insider rdatatable
                }
            };

            return component;

            function template() {
                return (
                    '<div class = "row">' +
                      '<div class="col-md-12">' +
                      '<div class="form-inline form-group pull-left">' +
                        'Showing 1 to 10 of 57 entries | ' +
                        'Show ' +
                        '<select class = "form-control" id="rdt-pagination">' +
                          '<option>All</option>' +
                          '<option>50</option>' +
                        '</select> Entries' +
                      '</div> ' +

                        '<ul class="pagination pagination-sm pull-right rpagination">' +
                          '<li><a href="#">&laquo;</a></li>' +
                          '<li><a href="#">1</a></li>' +
                          '<li><a href="#">2</a></li>' +
                          '<li><a href="#">&raquo;</a></li>' +
                        '</ul>' +
                      '</div>' +
                    '</div>'
                );
            }
        }

        RPaginationController.$inject = [];

        function RPaginationController(el, attr) {
            var vm = this;
        }
})();
