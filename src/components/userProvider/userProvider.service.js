(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .factory('userService', userService);

  userService.$inject = [
    '$rootScope',
    '$localStorage',
    '$sessionStorage',
    '$state',
    'AUTH_EVENTS'
  ];

  function userService($rootScope, $localStorage, $sessionStorage, $state, AUTH_EVENTS) {

    return {
      authenticate: authenticate,
      invalidateUser: invalidateUser,
      isAuthenticated: isAuthenticated,
      registerUser: registerUser
    };

    function authenticate(user) {
      var localStorage = $localStorage;
      var sessionStorage = $sessionStorage;

      var userList = localStorage.userList;
      var existingUserIndex = _.indexOf(userList, _.find(userList, {id: user.name}));
      var realUser = {};

      if(existingUserIndex !== -1) {
        realUser = userList[existingUserIndex].userObject;

        if(realUser.password === user.password) {
          realUser.authenticated = true;
          sessionStorage.activeUser = realUser;
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        } else {
          realUser.authenticated = false;
          delete sessionStorage.activeUser;
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        }
      } else {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      }
    }

    function invalidateUser() {
      var sessionStorage = $sessionStorage;
      delete sessionStorage.activeUser;
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
      // TODO: Remove $state from factory and check why broadcast isn't working all the time
      $state.go('login');
    }

    function isAuthenticated() {
      var sessionStorage = $sessionStorage;
      if (angular.isDefined(sessionStorage.activeUser)) {
        return sessionStorage.activeUser.authenticated;
      } else {
        return false;
      }
    }

    function registerUser(user) {
      // retrieve userlist from localStorage
      var localStorage = $localStorage;
      var userList = localStorage.userList;

      // Check that we have a valid array. If not, create a new one.
      if(userList !== null && angular.isDefined(userList)) {
        // Check if entry already exists and overwrite it rather than creating a new one
        // TODO: throw an error and show user that this account already exists
        var existingUserIndex = _.indexOf(userList, _.find(userList, {id: user.email}));
        if(existingUserIndex !== -1) {
          userList[existingUserIndex] = {id: user.email, userObject: user};
        } else {
          userList.push({id: user.email, userObject: user});
        }
      } else {
        userList = [{id: user.email, userObject: user}];
      }

      localStorage.userList = userList;
      authenticate({name: user.email, password: user.password});
    }

  }

})();
