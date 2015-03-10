var untappd = require('./untappd');
var logger = require('winston');

module.exports = function (notifier) {
  return {

    beerme: function *(args) {
      
      var lat = "40.7079088";
      var lng = "-74.0085144";
      var beersResponse = yield untappd.thePubLocal(lat, lng);
      
      if (beersResponse) {

          yield notifier.sendTemplate('beerme_response', beersResponse.response);
        
      } else {
          yield notifier.send('Sorry, can\'t find any local brews.');
      }
    }

  };
};