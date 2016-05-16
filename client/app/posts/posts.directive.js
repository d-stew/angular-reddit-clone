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
    vm.addComment = addComment;
    vm.upVote = upVote;
    vm.downVote = downVote;
    vm.showComments = showComments;

    activate();

    function activate() {
      postsService.list().then(function(posts){
        vm.posts = posts.posts;
        console.log(vm.posts);
      })
    }

    function addPost() {
      postsService.add();
      // .then(function(post){
      //   vm.posts[vm.posts.length+1] = post;
      //   console.log("New posts:" + vm.posts);
      // })
    }

    function addComment(newComment) {
      postsService.comment(newComment);
    }

    function upVote(post) {
      postsService.upVote(post);
    }

    function downVote(post) {
      postsService.downVote(post);
    }

    function showComments(post_id) {
      for (var i=0; i < vm.posts.length; i++) {
        if (vm.posts[i].id === post_id) {
          if (vm.posts[i].showComments === false) {
            vm.posts[i].showComments = true;
          } else {
            vm.posts[i].showComments = false;
          }

        }
      }
    }

  }
}());
