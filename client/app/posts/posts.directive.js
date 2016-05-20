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

  controller.$inject = ['$http', 'postsService', 'usersService'];

  function controller($http, postsService, usersService) {
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
      postsService.add()
      .then(function(post){
        vm.posts.push(post);
      })
    }

    function addComment(newComment, post_id, username) {
      console.log(currentUser);
      postsService.comment(newComment, post_id, username);
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
