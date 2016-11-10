'use strict';

const rp = require('request-promise');
const Promise = require('bluebird');

const romanize = require('./lib/romanize');

const ENDPOINT = 'http://www.omdbapi.com'

// Constructor
function Omdb() {
}

// Methods
Omdb.getShowFromImdbId = function(showImdbId) {
  return Promise.try(() => {
    
    let options = {
      method: 'GET',
      url: encodeURI(ENDPOINT + '?i=' + showImdbId + '&plot=short&r=json'),
      json: true
    }
    
    return rp(options);
  })
  .catch((err) => {
    throw err;
  });
}


module.exports = Omdb;