angular.module('app')
  .directive('modal', function(postsService) {
    console.log("Modal directive called");
    return {
      restrict: "E",
      templateUrl: "/app/layout/newpost.directive.html",
      scope: {},
      link: function(scope,element,attrs) {
        scope.vm = {};
        scope.addPost = function() {
          postsService.add();
        }

      }
    }
  })

  // (function() {
  //   'use strict';
  //
  //   angular.module('app')
  //     .directive('modal', modalDirective);
  //
  //   function modalDirective () {
  //     return {
  //       restrict: "E",
  //       templateURL: '/app/layout/newpost.directive.html',
  //       controller: controller,
  //       controllerAs: 'vm'
  //     }
  //   }
  //
  //   controller.$inject = ['postsService'];
  //
  //   function controller(postsService) {
  //     console.log('New post directive called');
      // var vm = this;
      // vm.addPost = addPost;
      //
      // function addPost() {
      //   postsService.add();
      // }
  //   }
  //
  // }());
