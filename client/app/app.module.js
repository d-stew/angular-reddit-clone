(function() {
  'use strict';

  var dependencies = [
    'ui.router',
    'app.posts'
  ];

  angular.module('app', dependencies)
    .config(setupRoutes);

  setupRoutes.$inject = [
    '$stateProvider'
  ];

  function setupRoutes($stateProvider){
    $stateProvider
      .state('app', {
        url: "",
        template: "<main></main>"
      });
  }
}());
