'use strict'; 

const Promise = require('bluebird');

const TvGuide = require('../../TvGuide');
const Omdb = require('../../Omdb');
const constants = require('./../../lib/constants')

// make an intenthandlers file, and thne a file for each intent.
// and a file for the core calls to the api.
// that'll clean this file up massively.
function ShowCastIntent(show) {
  let showToLookup;
  let language;
  
  try {
    // case where the call comes from Alexa.
    // locale is sent to us in the format cc-LC
    // (country code)-(LANGU?AGE CODE)
    language = this.event.request.locale.split('-')[1]; 
    showToLookup= this.event.request.intent.slots.Show.value;
    
  } catch (e) {
    // Otherwise we're in testing mode.
    language = 'GB';
    showToLookup = show; 
    
  }

  let tvGuide = new TvGuide(language);
  
  tvGuide.getShow(showToLookup)
  .then((show) => {
    
    return new Promise.try(() => {
      
      let imdbId = show.externals.imdb;
      let networkName = show.network.name;
      
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
        actorsSpeech += ' and ' + actorsArray[maxNumberOfActorsToList - 1];
        
        return `The ${networkName} show ${show.name} stars ${actorsSpeech}.`;
      });
    })
    .catch((err) => {
      console.log(err);
      throw new TvGuide.throwables.GenericShowLookupError();
    })
  })
  .catch((error) => tvGuide.errorHanding(error, showToLookup))
  .then((speakString) => {
    this.emit(':tell', speakString);
  });
}

module.exports = ShowCastIntent;