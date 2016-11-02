'use strict';

const rp = require('request-promise');
const moment = require('moment');
const Promise = require('bluebird');

const ENDPOINT = 'http://api.tvmaze.com'
const SHOWS = '/search/shows'
const CALENDAR_SPEECH_FORMAT = {
  lastDay : '[Yesterday at] LT',
  sameDay : '[Today at] LT',
  nextDay : '[Tomorrow at] LT',
  lastWeek : '[last] dddd [at] LT',
  nextWeek : '[on] dddd [at] LT',
  sameElse : '[on] dddd MMMM Do [at] LT'
};


// Constructor
function TvGuide(country) {
  this.country = country;
}

// Methods
TvGuide.prototype.getShow = function(showName) {
  return Promise.try(() => {
    
    let options = {
      method: 'GET',
      url: encodeURI(ENDPOINT + SHOWS + '?q=' + showName),
      json: true
    }
    
    return rp(options);
  })
  .catch((err) => {
    throw new NoShowsError();
  });
}

TvGuide.prototype.findShowInMyCountry = function(showsArray) {
  let self = this;
  
  return new Promise.try(() => {
        
    for (let show of showsArray) {
      if (show.show.network.country.code === self.country) {
        return show;
      }
    }
    
    throw 'Only gets here if there arent any shows in your country';
  })
  .catch((err) => {
    throw new NoShowMatchInCountryError();
  });
}

TvGuide.prototype.getNextEpisode = function(show) {
  return Promise.try(() => {
    let options = {
      method: 'GET',
      url: show.show._links.nextepisode.href,
      json: true
    };

    return [show, rp(options)];
  })
  .catch((err) => {
    throw new NoNextEpisodeError(show.show.network.name);
  });
  
}

TvGuide.prototype.parseShowAndEpisodeDataToSpeech = function(show, episodeData) {
  
  return new Promise.try(() => {
    let networkName = show.show.network.name;

    let showName = show.show.name;

    let niceDate = moment(episodeData.airstamp)
      .calendar(null, CALENDAR_SPEECH_FORMAT);

    let speakString = `
      The next episode of the ${networkName} show ${showName} airs ${niceDate}
    `;

    return speakString;
  })
  .catch((err) => {
    throw new GenericShowLookupError();
  });
}

TvGuide.prototype.errorHanding = (error, showQuery) => {
  return error.message(showQuery);
}

// ---------------------------------------------------
// Throwables
// ---------------------------------------------------

function NoShowsError() {
  this.message = function(showQuery) {
    return `Sorry, I couldn't find any shows by the name "${showQuery}"`;
  };
}
function NoShowMatchInCountryError() {
  this.message = function(showQuery) {
    return `Sorry, I couldn't find any shows by the name "${showQuery}" in your country`;
  };
}
function NoNextEpisodeError(networkName) { 
  this.networkName = networkName; 
  this.message = function(showQuery) {
    return `Sorry, there doesn't seem to be any new episodes for the ${this.networkName} show "${showQuery}"`;
  };
}
function GenericShowLookupError() {
  this.message = function(showQuery) {
    return `Sorry, something went wrong looking up "${showQuery}".  Please try again.`;
  };
}

 

module.exports = TvGuide;