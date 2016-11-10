'use strict'; 

const TvGuide = require('../../TvGuide');

// make an intenthandlers file, and thne a file for each intent.
// and a file for the core calls to the api.
// that'll clean this file up massively.
function ShowAirtimeIntent(show) {
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
  .then((showsArray) => tvGuide.findShowInMyCountry(showsArray, showToLookup))
  // the above is required for making sure we keep "this" inside the method.
  .then(tvGuide.getNextEpisode)
  .spread(tvGuide.parseShowAndEpisodeDataToSpeech)
  .catch((error) => tvGuide.errorHanding(error, showToLookup))
  .then((speakString) => { 
    this.emit(':tell', speakString)
  })
  
}

module.exports = ShowAirtimeIntent;