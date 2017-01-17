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
        .directive('rdatatable', rdatatable)
        .directive('rheader', rheader)
        .directive('thead', thead)
        .directive('rfilter', rfilter)
        .directive('rdtSearch', rdtSearch)
        .directive('rdtReset', rdtReset)
        .directive('tbody', tbody)
        .directive('rpagination', rpagination);

    /**
    *   Datatable Element
    */
    function rdatatable() {
        var directive = {
            restrict: 'E',
            scope: {
                'url' : '@? ', // link
                'limit' : '<?',
                'entry' : '<?', // default top
                'views' : '<?',
            },
            transclude: true,
            template: template,
            link: linkFunc,
            controller: DatatableController,
            controllerAs: 'vm',
            bindToController: true,
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            console.log('dt');
            console.log(ctrl);
            // console.log(ctrl.rdatatable);
            // console.log(ctrl.limit);
        }

        function template() {
            return (
                '<div class = "rdatatable col-lg-12" ng-transclude>' +
                '</div>' +
                '<rpagination></rpagination>'
            );
        }
    }

    DatatableController.$inject = ['rdtConfig', '$http', '$scope'];

    /* @ngInject */
    function DatatableController(rdtConfig, $http, $scope) {
        var vm = this;
        vm.config = rdtConfig;
        vm.searchables = {};
        vm.page;
        vm.keys = [];
        vm.data = {};
        var data = {
            'limit' : vm.limit,
            'filter' : vm.searchables,
            'page' : vm.page,
        }

        vm.filter = filter;
        vm.reset = reset;

        function filter() {
            $http.get(vm.url, data).then(function(result) {
                $scope.$evalAsync(function(){
                    vm.data = result;
                });
            });
        }

        function reset() {
            $http.get(vm.url, data).then(function(result) {
                $scope.$evalAsync(function(){
                    vm.data = result;
                });
            });
        }
    }

    /**
    *   Datatable Header
    */
    function rheader() {
        var directive = {
            restrict: 'E',
            scope: {
                search : '<?'
            },
            transclude: true,
            template: template,
            link: linkFunc,
            require : '^rdatatable', // must be insider rdatatable
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            // console.log('rheader');
            // console.log(ctrl);
            // console.log(scope.search);
        }

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

    /**
    *   Datatable <thead>
    */
    function thead() {
        var directive = {
            restrict: 'E',
            scope: {
            },
            link: linkFunc,
            require : '^rdatatable', // must be insider rdatatable
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            // expects array of th

            // var columns =  el.find('tr')[0].children,
            // the second tr in headers are input text or selects
            // searchables = el.find('tr')[1].children;
            formatColumns();
            // formatSearchables(el);
            console.log(ctrl.keys);
            function formatColumns() {
                // the first tr in header are columns
                var columns =  el.find('tr')[0].children;
                for(var key = 0; key < columns.length; key++) {
                    addAttributeSort(key);
                    getColumnName(columns[key], key);
                }

                function addAttributeSort(key) {
                    var column = columns[key];
                    if((scope.unsortable && scope.unsortable.indexOf(key) != -1)
                        // if there is already a sort attribute skip
                        || column.getAttribute('sort'))
                        return;

                    if(scope.sortable && scope.sortable.indexOf(key) == -1)
                        return;

                    column.setAttribute('sort', 'default');
                }

                function getColumnName(column, key) {
                    var name = column.getAttribute('name');
                    // if there is no name in column ignore
                    if(!name) return;

                    ctrl.keys[key] = name;
                }
            }

            function formatSearchables() {
                // if there is no expected searchables exit
                if(!el.find('tr')[1]) return;
                // the first tr in header are searchables expecting inputs
                var columns =  el.find('tr')[1].children;

                for(var key = 0; key < columns.length; key++) {
                    addAttributeSearch(columns[key].children, key);
                }

                function addAttributeSearch(column, key) {
                    // if already have attribute search
                    if(column.getAttribute('search')) return;

                    column.setAttribute('search', 'search'+key);
                }
            }
        }


    }

    /**
    *   rfilter : inputs specify for searching
    */
    function rfilter() {
        var directive = {
            restrict: 'E',
            scope: {
                'rsearch' : '@'
            },
            link: linkFunc,
            require : '^rdatatable', // must be insider rdatatable
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            var keyTimeout;
            el.on('keyup', function(){
                clearTimeout(keyTimeout);
                keyTimeout = setTimeout(function() {
                    ctrl.searchables[scope.rsearch] = el.val();
                }, 900);
            });
        }
    }

    /**
    *   rdtSearch : button specify to search what specified in rsearch
    */
    function rdtSearch() {
        var directive = {
            restrict: 'E',
            scope: {
            },
            link: linkFunc,
            require : '^rdatatable', // must be insider rdatatable
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            el.on('click', function(){

            });
        }
    }

    /**
    *   rdtReset : button specify to reset what all searches specified in rsearch
    */
    function rdtReset() {
        var directive = {
            restrict: 'E',
            scope: {
            },
            link: linkFunc,
            require : '^rdatatable', // must be insider rdatatable
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    /**
    *   Datatable <tbody>
    */
    function tbody() {
        var directive = {
            restrict: 'E',
            link: linkFunc,
            template: template,
            require : '^rdatatable', // must be insider rdatatable
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }

        function template(el) {
            return (
                '<tr>' +
                    '<td>Rej</td>'+
                    '<td>Silva</td>' +
                    '<td>Mediodia</td>'+
                    '<td>'+
                        '<button class = "btn btn-warning" title= "Edit">'+
                            '<span class = "glyphicon glyphicon-pencil"></span>'+
                        '</button>'+
                        '<button class = "btn btn-danger" title = "Delete">'+
                            '<span class = "glyphicon glyphicon-trash"></span>'+
                        '</button>'+
                    '</td>'+
                '</tr>'
            );
        }
    }

    /**
    * Datatable Pagination
    */
    function rpagination() {
        var directive = {
            restrict: 'E',
            scope: {

            },
            transclude: true,
            template: template,
            link: linkFunc,
            require : '^rdatatable' // must be insider rdatatable
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }

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
})();
