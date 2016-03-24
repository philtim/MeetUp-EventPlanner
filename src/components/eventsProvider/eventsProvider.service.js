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
      events = localStorage.events || mockData;
      return events.slice().reverse();
    }

    function addEvent(event) {
      var localStorage = $localStorage;
      events.push(event);
      localStorage.events = events;
    }

  }

  var mockData = [{
    'guests': ['Philipp', 'John', 'Sarah'],
    'location': '101 W 6th St # 200,Austin, TX 78701, USA',
    'name': 'Design Kickoff',
    'type': 'Meeting',
    'host': 'Philipp',
    'start': '2016-07-07T10:00:00.000Z',
    'end': '2016-07-07T13:00:00.000Z'
  },
    {
      'guests': ['Amy', 'Mary', 'Julia', 'Hannah', 'Lou', 'Zoe'],
      'location': 'Rosensteinstraße 20,70191 Stuttgart',
      'name': 'Cinema evening',
      'type': 'Hanging out',
      'host': 'Zoe',
      'start': '2016-05-07T19:00:00.000Z',
      'end': '2016-05-07T23:00:00.000Z',
      'description': 'Thunder, thunder, thundercats, Ho! Thundercats are on the move, Thundercats are loose. Feel the magic, hear the roar, Thundercats are loose. Thunder, thunder, thunder, Thundercats! Thunder, thunder, thunder, Thundercats! Thunder, thunder, thunder, Thundercats! Thunder, thunder, thunder, Thundercats! Thundercats!'
    }
  ];

})();
