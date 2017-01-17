/**
 * Angular datatable pagination
 * will handle pagination of datatable
 * @author Rej Mediodia
 * @copyright 2016
 * https://github.com/rejtg21
 */
(function() {
    'use strict';

    angular
        .module('ngDatatable')
        .directive('rpagination', rpagination);

    rpagination.$inject = ['$compile'];

    /* @ngInject */
    function rpagination($compile) {
        var directive = {
            restrict: 'E',
            // template: template,
            scope: {
            },
            transclude: true,
            link: linkFunc,
            // controller: RPaginationController,
            // controllerAs: 'vm',
            // bindToController: true,
            require: '^rdatatable'  // must be insider rdatatable
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            var total_page = 1,
              total = 0,
              range = 1;
            scope.pages = [];
            init();
            function init() {
                run();
                generateTemplate();
            }

            function run() {
                scope.$watch(function(){
                    return ctrl.total;
                }, function(val) {
                    if(!val) return;

                    total = val;
                    // console.log(total);
                    getTotalPage();
                });

                scope.$watch(function(){
                    return ctrl.limit;
                }, function(val) {
                    if(!val) return;

                    range = val;
                    getTotalPage();
                });

                scope.switchPage = function(page) {
                    ctrl.page = page;
                    ctrl.filter();
                };
            }

            function getTotalPage() {
                scope.pages = [];
                total_page = Math.ceil(total/range);
                total_page = (total_page == 0) ? 1 : total_page;

                for(var i = 1; i <= total_page; i++) {
                    scope.pages.push(i);
                }

                console.log(ctrl.total);
                console.log(range);
                console.log(total_page);
                console.log('pages ');
                console.log(scope.pages);
            }

            function generateTemplate() {
                var html = (
                    '<ul class="pagination pagination-sm pull-right rpagination">' +
                      '<li><a href="#">&laquo;</a></li>' +
                      '<li ng-repeat = "data in pages track by data"><a href="javascript:;" ng-click="switchPage(data)">{{::data}}</a></li>' +
                      '<li><a href="#">&raquo;</a></li>' +
                    '</ul>'
                );
                el.html(html);
                $compile(el.contents())(scope);

            }
        }

        // function template() {
        //     return (
        //         '<ul class="pagination pagination-sm pull-right rpagination">' +
        //           '<li><a href="#">&laquo;</a></li>' +
        //           '<li><a href="#">1</a></li>' +
        //           '<li><a href="#">2</a></li>' +
        //           '<li><a href="#">&raquo;</a></li>' +
        //         '</ul>'
        //     );
        // }
    }

    RPaginationController.$inject = [];

    /* @ngInject */
    function RPaginationController() {
        var vm = this;

    }
})();
