(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .directive('inputGeolocation', inputGeolocation);

  function inputGeolocation() {
    var directive = {
      restrict: 'E',
      require: 'ngModel',
      scope: {
        location: '=ngModel',
        name: '='
      },
      link: linkFunc,
      templateUrl: './components/formControls/inputGeolocation/inputGeolocation.directive.html',
      controller: InputGeolocationController,
      controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, el) {
      var locationInput = el.find('input')[0];
      var autocomplete;
      var options = {
        componentRestrictions: {},
        types: []
      };

      autocomplete = new google.maps.places.Autocomplete(locationInput, options);
      autocomplete.addListener('place_changed', function() {
        scope.$apply(function() {
          scope.location = locationInput.value;
        });
      });

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          getReverseGeocodingData(pos.lat, pos.lng);
        });
      }

      function getReverseGeocodingData(lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng);
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var address = (results[0].formatted_address);
            scope.$apply(function() {
              scope.location = address;
            });
          }
        });
      }
    }

    function InputGeolocationController() {}
  }

})();
