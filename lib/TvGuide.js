'use strict';

const rp = require('request-promise');
const Promise = require('bluebird');

const romanize = require('./helpers/romanize');

const ENDPOINT = 'http://api.tvmaze.com';
const SHOWS = '/search/shows';
const SINGLESEARCH = '/singlesearch/shows';

// Constructor
function TvGuide(country) {
  this.country = country;
}

// Methods
TvGuide.prototype.getShows = function(showName) {
  return Promise.try(() => {
    
    let options = {
      method: 'GET',
      url: encodeURI(ENDPOINT + SHOWS + '?q=' + showName),
      json: true
    };
    
    return rp(options);
  })
  .catch(() => {
    throw new NoShowsError();
  });
};

// Methods
TvGuide.prototype.getShow = function(showName) {
  return Promise.try(() => {

    let options = {
      method: 'GET',
      url: encodeURI(ENDPOINT + SINGLESEARCH + '?q=' + showName),
      json: true
    };

    return rp(options);
  })
  .catch(() => {
    throw new NoShowsError();
  });
};

TvGuide.prototype.findShowInMyCountry = function(showsArray, showToLookup) {
  let self = this;
  
  return new Promise.try(() => {
        
    for (let show of showsArray) {
      if (show.show.network.country.code === self.country) {
        return show;
      }
    }
    
    throw 'Only gets here if there arent any shows in your country';
  })
  .catch(() => {
    // if we've got a number, try it with roman numerals (api can't handle it)
    // for example Planet Earth II.

    try {
      if (showToLookup.match(/\d/g).length > 0) {
        let newShowToLookup = showToLookup.replace(/\d/g, function(something) {
          return romanize(something);
        });

        return self.getShows(newShowToLookup)
        .then((showsArray) => self.findShowInMyCountry(showsArray, showToLookup));
      } else {
        throw new NoShowMatchInCountryError();
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
};

TvGuide.prototype.getNextEpisode = function(show) {
  return Promise.try(() => {
    let options = {
      method: 'GET',
      url: show.show._links.nextepisode.href,
      json: true
    };

    return [show, rp(options)];
  })
  .catch(() => {
    throw new NoNextEpisodeError(show.show.network.name, show.show.name);
  });
};

TvGuide.prototype.getPreviousEpisode = function(show) {
  return Promise.try(() => {
    let options = {
      method: 'GET',
      url: show._links.previousepisode.href,
      json: true
    };

    return [show, rp(options)];
  })
  .catch(() => {
    throw new NoPreviousEpisodeError(show.network.name, show.name);
  });
};

TvGuide.prototype.formatEpisodeSummaryIntoArray = function(summary) {
  let summaryArray = summary.split('</p><p>');
  let newArray = [];

  // strip html from here.  http://stackoverflow.com/questions/822452/strip-html-from-text-javascript.  As we're not doing anything DOM related this is safe.
  for (let string of summaryArray) {
    newArray.push(string.replace(/<(?:.|\n)*?>/gm, ''));
  }

  return newArray;
};

// ---------------------------------------------------
// Throwables
// ---------------------------------------------------

class NoShowsError extends Error {
  constructor() {
    super('NoShowsError');
    this.name = 'NoShowsError';
    this.message = function(showQuery) {
      return `Sorry, I couldn't find any shows by the name "${showQuery}."`;
    };
  }
}

class NoShowMatchInCountryError extends Error {
  constructor() {
    super('NoShowMatchInCountryError');
    this.name = 'NoShowMatchInCountryError';
    this.message = function(showQuery) {
      return `Sorry, I couldn't find any shows by the name "${showQuery}" in your country.`;
    };
  }
}

class NoNextEpisodeError extends Error {
  constructor(networkName, showName) {
    super('NoNextEpisodeError');
    this.name = 'NoNextEpisodeError';
    this.networkName = networkName;
    this.showName = showName;
    this.message = function() {
      return `Sorry, there doesn't seem to be any new episodes for the ${this.networkName} show "${this.showName}."`;
    };
  }
}

class NoPreviousEpisodeError extends Error {
  constructor(networkName, showName) {
    super('NoPreviousEpisodeError');
    this.name = 'NoPreviousEpisodeError';
    this.networkName = networkName;
    this.showName = showName;
    this.message = function() {
      return `Sorry, I'm having trouble finding the previous episode of the ${this.networkName} show "${this.showName}."`;
    };
  }
}

class GenericShowLookupError extends Error {
  constructor() {
    super('GenericShowLookupError');
    this.name = 'GenericShowLookupError';
    this.message = function(showQuery) {
      return `Sorry, something went wrong looking up "${showQuery}".  Please try again."`;
    };
  }
}

TvGuide.throwables = {
  'NoShowsError': NoShowsError,
  'NoShowMatchInCountryError': NoShowMatchInCountryError,
  'NoNextEpisodeError': NoNextEpisodeError,
  'GenericShowLookupError': GenericShowLookupError
};
 

TvGuide.errorHanding = (error, showQuery) => {
  if (Object.keys(TvGuide.throwables).indexOf(error.name) === -1) {
    console.log(error);
  }
  return error.message(showQuery);
};

module.exports = TvGuide;
