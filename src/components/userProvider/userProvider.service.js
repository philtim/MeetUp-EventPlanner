(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .factory('userService', userService);

  userService.$inject = [
    '$rootScope',
    '$log',
    'AUTH_EVENTS',
    'localStorageService'
  ];

  function userService($rootScope, $log, AUTH_EVENTS, localStorageService) {

    return {
      authenticate: authenticate,
      invalidateUser: invalidateUser,
      isAuthenticated: isAuthenticated,
      registerUser: registerUser
    };

    function authenticate(user) {
      user.authenticated = true;
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    }

    function invalidateUser(user) {
      user.authenticated = false;
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    }

    function isAuthenticated(user) {
      return user.authenticated;
    }

    function registerUser(user) {
      // retrieve userlist from localStorage
      var userList = localStorageService.get('userlist');

      // Check that we have a valid array. If not, create a new one.
      if(userList !== null) {
        // Check if entry already exists and overwrite it rather than creating a new one
        var existingUserIndex = _.indexOf(userList, _.find(userList, {id: user.email}));
        if(existingUserIndex !== -1) {
          userList[existingUserIndex] = {id: user.email, userObject: user};
        } else {
          userList.push({id: user.email, userObject: user});
        }
      } else {
        userList = [{id: user.email, userObject: user}];
      }

      localStorageService.set('userlist', userList);
    }

  }

})();
