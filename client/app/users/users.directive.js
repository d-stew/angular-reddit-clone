(function() {
  'use strict';

  angular.module('app.users')
    .directive('users', usersDirective);


  function usersDirective () {
    return {
      templateUrl: '/app/users/users.directive.html',
      controller: controller,
      controllerAs: 'vm'
    }
  }

  controller.$inject = ['$scope', '$http', 'usersService'];

  function controller($scope, $http, usersService) {
    var vm = this;
    vm.users = [];

    // activate();
    //
    // function activate() {
    //   postsService.list().then(function(posts){
    //     vm.posts = posts.posts;
    //     console.log(vm.posts);
    //   })
    // }

  }
}());
