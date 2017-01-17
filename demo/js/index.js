(function() {
    'use strict';

    angular
        .module('app', ['ngDatatable'])
        .controller('AppController', AppController);

    AppController.$inject = [];

    /* @ngInject */
    function AppController() {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();
