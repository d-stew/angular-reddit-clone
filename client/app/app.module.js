(function() {
  'use strict';

  var dependencies = [
    'ui.router',
    'app.posts',
    'app.users'
  ];

  angular.module('app', dependencies)
    .config(setupRoutes);

  setupRoutes.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    '$locationProvider'
  ];

  function setupRoutes($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){
    $httpProvider.interceptors.push("authInterceptor");

    $stateProvider
      .state('app', {
        url: "/",
        template: "<main></main>",
        resolve: {
          currentUser: function ($http, $location) {
            return $http.get('http://localhost:3000/api/v1/users/me')
              .then(function (response) {
                console.log('CURRENT USER:', response.data)
                return response.data
              })
              .catch(function (error) {
                console.log('Error: ', error)
                localStorage.clear();
                $location.path('/');
                return null;
              })
          }
        },
        controller: function($scope, currentUser){
          $scope.currentUser = currentUser;
        }
      });
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  }

  angular.module('app').run(function ($rootScope, $location, $window) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      // if the next route requires login
      // and we don't have a token
      // then redirect to the homepage
      if (next.$$route.requiresLogin && !localStorage.getItem('token')) {
        $location.path('/');
      }

    });
  });

  angular.module('app').factory('authInterceptor', function ($location) {
      return {
        request: function(config) {
          if (localStorage.getItem('token')) {
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
          }
          return config;
        },

        responseError: function(response) {
          if (response.status === 403) {
            // Optionally check if token is there, or read the error...
            // Do nice UX stuff for users
            // OR cut them off at the knees...
            // localStorage.removeItem('token');
            $location.path('/signup');
          }
          return response;
        }
      };
    })

}());
