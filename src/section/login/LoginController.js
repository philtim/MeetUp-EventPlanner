(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .controller('LoginController', LoginController);


  function LoginController() {
    var vm = this;
    vm.message = 'LoginController';
  }

})();
