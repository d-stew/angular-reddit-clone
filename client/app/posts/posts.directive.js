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
    var vm = this;
    vm.addPost = addPost;
    vm.upVote = upVote;
    vm.downVote = downVote;

    activate();

    function activate() {
      postsService.list().then(function(posts){
        vm.posts = posts;
        console.log(vm.posts)
      })
    }

    function addPost() {
      postsService.add();
    }

    function upVote(post) {
      postsService.upVote(post);
    }

    function downVote(post) {
      postsService.downVote(post);
    }
  }

}());
