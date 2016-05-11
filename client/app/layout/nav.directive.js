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
      // vm.addPost = addPost;
      $scope.newPost = {};
      $scope.addPost = addPost;

      function addPost(newPost) {
        postsService.add(newPost);
        $scope.newPost = {};
      }
    }

}());
