(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .controller('MainController', MainController);


  function MainController() {
    var main = this;
    main.message = 'MainController';
  }

})();
