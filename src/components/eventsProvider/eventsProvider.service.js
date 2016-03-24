(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .factory('eventService', eventService);

  eventService.$inject = [
    '$localStorage'
  ];

  function eventService($localStorage) {

    var events = [];

    return {
      getEvents: getEvents,
      addEvent: addEvent
    };

    function getEvents() {
      var localStorage = $localStorage;
      events = localStorage.events;
      return events.slice().reverse();
    }

    function addEvent(event) {
      var localStorage = $localStorage;
      events.push(event);
      localStorage.events = events;
    }

  }

})();
