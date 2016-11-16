'use strict'; 

const Promise = require('bluebird');

const getAlexaRequest = require('../../lib/helpers/getAlexaRequest');

const TvGuide = require('../../lib/TvGuide');
const Omdb = require('../../lib/Omdb');
const constants = require('./../../lib/helpers/constants');

function ShowCastIntent() {
  let showToLookup;
  let language;

  try {
    // Error handing to check that I'm being given everything I need by Alexa.
    showToLookup = getAlexaRequest.slotValue(this.event.request, 'Show');
    language = getAlexaRequest.localeInformation(this.event.request);
  } catch (error) {
    if (Object.keys(getAlexaRequest.throwables).indexOf(error.name) > -1 ) {
      // If it's one of ours. use that message.
      return this.emit(':tell', error.message());
    } else {
      // We should never get here, but just in case...
      return this.emit(':tell', `Sorry, there was a problem looking up your show's start time.`);
    }
  }

  let tvGuide = new TvGuide(language);
  
  tvGuide.getShow(showToLookup)
  .then((show) => {
    
    return new Promise.try(() => {

      let imdbId = show.externals.imdb;
      let networkName = show.network.name;
      
      if (imdbId === undefined || imdbId === null) {
        throw new Omdb.throwables.NoImdbIdAvailableError();
      }

      return Omdb.getShowFromImdbId(imdbId)
      .then((result) => {

        // Actors comes as a ', ' seperated string, we need to speechify it.
        let actorsArray = result.Actors.split(', ');
        
        // Dont list them all out, only do it to a max number
        let maxNumberOfActorsToList;
        if (actorsArray.length < constants.MAX_NUMBER_OF_ACTORS) {
          maxNumberOfActorsToList = actorsArray.length;
        } else {
          maxNumberOfActorsToList = constants.MAX_NUMBER_OF_ACTORS;
        }
        
        // List them out, and add an "and" at the end.
        let actorsSpeech = actorsArray[0];
        for (let i = 1; i < maxNumberOfActorsToList - 1; i++) {
          actorsSpeech += ', ' + actorsArray[i];
        }
        if (maxNumberOfActorsToList > 1) {
          actorsSpeech += ' and ' + actorsArray[maxNumberOfActorsToList - 1];
        }
        
        return `The ${networkName} show ${show.name} stars ${actorsSpeech}.`;
      });
    })
    .catch(() => {
      throw new Omdb.throwables.NoCastAvailableError();
    });
  })
  .catch((error) => {
    if (Object.keys(TvGuide.throwables).indexOf(error.name) > -1) {
      return TvGuide.errorHanding(error, showToLookup);
    } else if (Object.keys(Omdb.throwables).indexOf(error.name) > -1) {
      return Omdb.errorHanding(error, showToLookup);
    } else {
      // Log it to the console and error with a generic message.
      console.log(error);
      return TvGuide.errorHanding(new TvGuide.throwables.GenericShowLookupError(), showToLookup);
    }
  })
  .then((speakString) => {
    this.emit(':tell', speakString);
  });
}

module.exports = ShowCastIntent;
