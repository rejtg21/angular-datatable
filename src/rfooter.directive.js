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
         .directive('rfooter', rfooter);

     /* @ngInject */
     function rfooter() {
         var directive = {
             restrict: 'E',
             template: template,
             scope: {
             },
             link: linkFunc,
             require: '^rdatatable'
         };

         return directive;

         function linkFunc(scope, el, attr, ctrl) {

         }

         function template() {
             return (
                 '<div class = "row">' +
                    '<div class = "col-md-12">' +
                         '<rview></rview>' +
                         '<rpagination></rpagination>' +
                    '</div>' +
                '</div>'
             );
         }
     }

 })();
