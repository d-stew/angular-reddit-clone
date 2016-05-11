(function() {
  'use strict';

  angular.module('app')
    .directive('nav', navDirective);

  function navDirective () {
    return {
      templateUrl: '/app/layout/nav.directive.html',
      controller: controller,
      controllerAs: 'vm'
    }
  }

  controller.$inject = ['$http', '$scope', 'postsService'];

  function controller($http, $scope, postsService) {
      var vm = this;
      $scope.newPost = {};
      $scope.nav = {};
      $scope.nav.sorter = "score";
      $scope.nav.reverse = true;
      
      $scope.addPost = addPost;
      $scope.sortBy = sortBy;

      function addPost(newPost) {
        postsService.add(newPost);
        $scope.newPost = {};
      }

      function sortBy(sorter) {
        if (sorter == "title") {
          $scope.nav.reverse = false;
        }
        if (sorter == "score") {
          $scope.nav.reverse = true;
        }
        return $scope.nav.sorter = sorter;
      };

    }

}());
