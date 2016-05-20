(function() {
  'use strict';

  angular.module('app')
    .directive('main', mainDirective);

  function mainDirective () {
    return {
      restrict: 'E',
      templateUrl: '/app/layout/layout.directive.html',
      controller: function () {
      }
    }
  }
}());
