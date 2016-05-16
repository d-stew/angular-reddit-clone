(function() {
  'use strict';

  angular.module('app.posts')
    .factory('postsService', factory);
    // Factories return services

    factory.$inject = ['$http'];

    function factory($http) {
      var posts = [];

      return {
        add: addPost,
        comment: addComment,
        list: listPosts,
        upVote: upVote,
        downVote: downVote
      }

      function listPosts() {
        var factory = this;
        return $http.get('http://localhost:3000/api/v1/posts')
        .then(function(response) {
          factory.posts = response.data;
          return factory.posts;
        })
      }

      function addPost(newPost) {
        return $http.post('http://localhost:3000/api/v1/posts', {
          title: newPost.title,
          author: newPost.author,
          image: newPost.image,
          description: newPost.description
        })
        .then(function(response){
          return response.data
        })
      }

      function addComment(newComment) {
        return $http.post('http://localhost:3000/api/v1/posts/comments', {
          post_id: newComment.post_id,
          username: newComment.username,
          comment: newComment.comment
        })
      }

      function upVote(post) {
        return $http.post('http://localhost:3000/api/v1/posts/upvote', {
          id: post.id,
          score: post.score++
        })
        // .then(function(response){
        //   posts.push(response.data);
        //   console.log(posts);
        // })
      }

      function downVote(post) {
        return $http.post('http://localhost:3000/api/v1/posts/downvote', {
          id: post.id,
          score: post.score--
        })
      }
    }



}());
