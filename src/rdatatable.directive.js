/**
 * Angular datatable parent directive
 * handle everything in datatable
 * @author Rej Mediodia
 * @copyright 2016
 * https://github.com/rejtg21
 */
(function() {
    'use strict';

    angular
        .module('ngDatatable')
        .directive('rdatatable', rdatatable);

    /* @ngInject */
    function rdatatable() {
        var directive = {
            restrict: 'E',
            template: template,
            scope: {
                'url' : '@?',
                'limit' : '<?',
                'showEntry' : '<?',
                'views' : '<?'
            },
            transclude: true,
            link: linkFunc,
            controller: DatatableController,
            controllerAs: 'dc',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }

        function template() {
            return (
                '<div class = "rdatatable col-lg-12" ng-transclude>' +
                '</div>' +
                '<rfooter></rfooter>'
            );
        }
    }

    DatatableController.$inject = ['$http', '$sce', '$scope', 'RDT_CONFIG'];

    /* @ngInject */
    function DatatableController($http, $sce, $scope, RDT_CONFIG) {
        var vm = this,
        params;

        vm.config;
        vm.columns = [];
        vm.showHtml = showHtml;
        // filter needed to be search
        vm.searchables = [];
        vm.sortables = [];
        // current selected page
        vm.page;
        // holds the data presented in the table
        vm.data = [];
        // limit
        vm.limit = vm.limit || RDT_CONFIG.LIMIT;
        // total count
        vm.total = 0;

        // run search of datatable
        vm.filter = filter
        // reset the searchables
        vm.reset = reset;

        activate();

        function activate() {
            reset();
            // watch();
        }

        function filter() {
            console.log('filtering', vm.url);
            if(!vm.url) return console.error('url not defined');

            // parameters to be requested
            params = {
              'sort': vm.sortables,
              'limit': vm.limit,
              'filter': vm.searchables,
              'page': vm.page
            };

            $http.post(vm.url, params).then(function(result) {
                var result = result.data;
                console.log('result');
                console.log(result);

                assignData(result);
            });
        }

        function reset() {
            console.log('resetting', vm.url);
            if(!vm.url) return console.error('url not defined');

            // parameters to be requested
            params = {
              'sort': vm.sortables,
              'limit': vm.limit,
              'filter': vm.searchables,
              'page': vm.page
            };

            $http.post(vm.url, params).then(function(result) {
                var result = result.data;

                assignData(result);
            });
        }

        function assignData(result) {
            vm.data = result.data;
            // if(!result.total) return console.error('total required');

            vm.total = result.total;
        }

        function showHtml(text) {
            return $sce.trustAsHtml(text);
        }
    }
})();
