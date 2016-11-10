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


class NoImdbIdAvailableError extends Error {
  constructor() {
    super('NoImdbIdAvailableError');
    this.name = 'NoImdbIdAvailableError';
    this.message = function(showQuery) {
      return `Sorry, I couldn't find any shows by the name "${showQuery}".`;
    };
  }
}
class NoCastAvailableError extends Error {
  constructor() {
    super('NoCastAvailableError');
    this.name = 'NoCastAvailableError';
    this.message = function(showQuery) {
      return `Sorry, I couldn't find any cast for the show "${showQuery}".`;
    };
  }
}

Omdb.throwables = {
  'NoImdbIdAvailableError': NoImdbIdAvailableError,
  'NoCastAvailableError': NoCastAvailableError,
}

Omdb.errorHanding = (error, showQuery) => {
  if (Object.keys(Omdb.throwables).indexOf(error.name) === -1) {
    console.log(error);
  }
  return error.message(showQuery);
}

module.exports = Omdb;
