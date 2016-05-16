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
    vm.posts = [];
    vm.addPost = addPost;
    vm.upVote = upVote;
    vm.downVote = downVote;

    activate();

    function activate() {
      postsService.list().then(function(posts){
        vm.posts = posts;
      })
      postsService.comments().then(function(comments) {
        vm.comments = comments;
      })
    }

    function addPost() {
      postsService.add();
      // .then(function(post){
      //   vm.posts[vm.posts.length+1] = post;
      //   console.log("New posts:" + vm.posts);
      // })
    }

    function upVote(post) {
      postsService.upVote(post);
    }

    function downVote(post) {
      postsService.downVote(post);
    }
  }

}());
