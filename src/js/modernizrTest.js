(function () {
  'use strict';

  // Check if browser support input types date and time. If not,
  // add a specific class on the html tag.
  if (!Modernizr.inputtypes.date) document.getElementsByTagName('html')[0].className += ' noDate';
  if (!Modernizr.inputtypes.time) document.getElementsByTagName('html')[0].className += ' noTime';

})();
