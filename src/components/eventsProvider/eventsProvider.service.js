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
    },
    {
      'guests': ['Donald', 'Tick', 'Trick', 'Truck', 'Mickey', 'Goofy', 'Cinderella'],
      'location': '77777 Marne-la-Vallée,Frankreich',
      'name': '5th Birthday of Anna',
      'type': 'Birthday',
      'host': 'Hanna Montana',
      'start': '2016-10-10T11:00:00.000Z',
      'end': '2016-10-10T19:00:00.000Z',
      'description': 'Ulysses, Ulysses - Soaring through all the galaxies. In search of Earth, flying in to the night. Ulysses, Ulysses - Fighting evil and tyranny, with all his power, and with all of his might. Ulysses - no-one else can do the things you do. Ulysses - like a bolt of thunder from the blue. Ulysses - always fighting all the evil forces bringing peace and justice to all.'
    },
    {
      'guests': ['Philipp', 'Samuel'],
      'location': 'Altensteiger Str. 35,72227 Egenhausen',
      'name': 'Paired Programming Session',
      'type': 'Coding',
      'host': 'Me',
      'start': '2016-04-04T11:00:00.000Z',
      'end': '2016-04-04T19:00:00.000Z',
      'description': 'Bacon ipsum dolor amet andouille tail bacon ham hock, cupim sirloin meatloaf strip steak bresaola. Ball tip frankfurter spare ribs shank beef ribs tri-tip andouille tenderloin jerky ground round meatloaf cow pork venison sausage. Pig biltong jowl capicola prosciutto, boudin meatloaf tongue meatball pastrami ground round chicken bacon tail. Biltong short ribs bacon brisket turkey pig tongue doner.'
    }
  ];

})();
