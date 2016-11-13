'use strict'; 

const Promise = require('bluebird');

const TvGuide = require('../../lib/TvGuide');
const Omdb = require('../../lib/Omdb');
const constants = require('./../../lib/helpers/constants');

function ShowCastIntent() {
  let showToLookup;
  let language;
  
  try {
    showToLookup= this.event.request.intent.slots.Show.value;

    // case where the call comes from Alexa.
    // locale is sent to us in the format cc-LC
    // (country code)-(LANGU?AGE CODE)
    language = this.event.request.locale.split('-')[1];
  } catch (e) {
    // Otherwise default to GB
    language = 'GB';
  }

  let tvGuide = new TvGuide(language);
  
  tvGuide.getShow(showToLookup)
  .then((show) => {
    
    return new Promise.try(() => {
      
      console.log(show);

      let imdbId = show.externals.imdb;
      let networkName = show.network.name;
      
      if (imdbId === undefined || imdbId === null) {
        throw new Omdb.throwables.NoImdbIdAvailableError();
      }

      return Omdb.getShowFromImdbId(imdbId)
      .then((result) => {
        console.log(result);

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
        actorsSpeech += ' and ' + actorsArray[maxNumberOfActorsToList - 1];
        
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
