(function() {
  'use strict';

  angular.module('app')
    .directive('nav', navDirective);

  function navDirective () {
    return {
      templateUrl: '/app/layout/nav.directive.html'
    }
  }

}());
