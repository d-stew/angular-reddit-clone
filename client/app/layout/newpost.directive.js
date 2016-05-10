angular.module('app')
  .directive('modal', function() {
    return {
      restrict: "E",
      templateUrl: "/app/layout/newpost.directive.html"
    }
  })
