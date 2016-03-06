(function() {
  'use strict';

  angular
    .module('eventPlanner')
    .config(function($logProvider) {
      $logProvider.debugEnabled(true);
    });

})();
