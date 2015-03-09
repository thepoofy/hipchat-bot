var untappd = require('./untappd');

module.exports = function (notifier) {
  return {

    beerme: function *(args) {
      
      var lat = "40.7079088";
      var lng = "-74.0085144";
      var beersResponse = yield untappd.thePubLocal(lat, lng);
      if (beersResponse) {
        var address = venue.location.address + ', ' + venue.location.city + ', ' + venue.location.state;
        yield notifier.sendTemplate('beers', {
          url: 'https://untappd.com/venue/' + venue.venue_id,
          venue: venue,
          address: address,
          beers: venue.top_beers.items
        });
      } else {
        yield notifier.send('Sorry, I didn\'t find a matching venue.');
      }
    }

  };
};