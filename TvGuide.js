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
  nextWeek : 'dddd [at] LT',
  sameElse : 'dddd MMMM Do [at] LT'
};


// Constructor
function TvGuide(country) {
  this.country = country;
}

// Methods
TvGuide.prototype.getShow = function(showName) {
  
  let options = {
      method: 'GET',
      url: encodeURI(ENDPOINT + SHOWS + '?q=' + showName),
      json: true
  }

  return rp(options);
}

TvGuide.prototype.getNextEpisode = function(show) {
  
  let links = show.show._links;
  
  if (links.hasOwnProperty('nextepisode')) {

    let options = {
      method: 'GET',
      url: links.nextepisode.href,
      json: true
    };
    
    return [show, rp(options)];
  } else {
    return [show, Promise.reject(new Error('no new episode found'))];
  }
  
}

TvGuide.prototype.findShowInMyCountry = function(showsArray) {
  let self = this;
  
  return new Promise(function(resolve, reject) {
        
    let firstShowInCountry = null;
    for (let show of showsArray) {
      if (show.show.network.country.code === self.country) {
        firstShowInCountry = show;
        break;
      }
    }
    
    if (firstShowInCountry !== null) {
      resolve(firstShowInCountry);
    } else {
      reject(firstShowInCountry)
    }
  });
}

TvGuide.prototype.parseShowAndEpisodeDataToSpeech = function(show, episodeData) {
  
  let networkName = show.show.network.name;
  
  let showName = show.show.name;
  
  let niceDate = moment(episodeData.airstamp)
    .calendar(null, CALENDAR_SPEECH_FORMAT);
  
  let speakString = `
    The next episode of the ${networkName} show ${showName} airs on ${niceDate}
  `;
  
  return speakString;
  
}

module.exports = TvGuide;