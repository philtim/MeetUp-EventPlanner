(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .controller('LoginController', LoginController);


  function LoginController() {
    var main = this;
    main.message = 'LoginController';
  }

})();
