(function() {
  'use strict';

  angular.module('app.posts')
    .directive('posts', postsDirective);


  function postsDirective () {
    return {
      templateUrl: '/app/posts/posts.directive.html',
      controller: controller,
      controllerAs: 'vm'
    }
  }

  controller.$inject = ['$http', 'postsService'];

  function controller($http, postsService) {
    console.log('Posts directive called');
    var vm = this;
    vm.addPost = addPost;
    activate();

    function activate() {
      postsService.list().then(function(posts){
        vm.posts = posts;
      })
    }

    function addPost() {
      postsService.add();
    }
  }

}());
