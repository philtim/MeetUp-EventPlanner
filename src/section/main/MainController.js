(function () {
  'use strict';


  angular
    .module('eventPlanner')
    .controller('MainController', MainController);

  function MainController() {
    var vm = this;
    vm.message = 'MainController';
  }

})();
