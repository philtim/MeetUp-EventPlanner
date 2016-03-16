(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .factory('userService', userService);

  userService.$inject = [
    '$rootScope',
    '$log',
    'AUTH_EVENTS'
  ];

  var fakeUser = {};
  fakeUser.isAuthenticated = false;

  function userService($rootScope, $log, AUTH_EVENTS) {

    return {
      authenticate: authenticate,
      isAuthenticated: isAuthenticated
    };

    function authenticate(user) {
      fakeUser.isAuthenticated = true;
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    }

    function invalidateUser(user) {
      fakeUser.isAuthenticated = false;
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    }

    function isAuthenticated(user) {
      return fakeUser.isAuthenticated;
    }

  }

})();
