var request = require('co-request');
var qs = require('querystring');
var env = require('./util').env;

var clientId = env('UNTAPPD_CLIENT_ID');
var clientSecret = env('UNTAPPD_CLIENT_SECRET');

function get(path, params) {
  var baseUrl = 'https://api.untappd.com/v4';
  return function *() {
    url = baseUrl + path;
    params = params || {};
    params.client_id = clientId,
    params.client_secret = clientSecret;
    if (Object.keys(params).length > 0) {
      url += '?' + qs.stringify(params);
    }
    var response = yield request.get(url);
    if (response.body) {
      return JSON.parse(response.body);
    }
  };
};

exports.thePubLocal = function (lat, lng) {
  return function *() {
    return yield get('/thepub/local', {'lat': lat, 'lng':lng, 'dist_pref': 'km', 'radius': '1', 'limit': '10'});
  };
};