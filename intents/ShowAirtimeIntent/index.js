'use strict'; 

const TvGuide = require('../../TvGuide');
const romanize = require('../../lib/romanize');

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
  .then((showsArray) => tvGuide.findShowInMyCountry(showsArray))
  // the above is required for making sure we keep "this" inside the method.
  .catch((error) => {
    // if we've got a number, try it with roman numerals (api can't handle it)
    // for example Planet Earth II.

    try {
      if (showToLookup.match(/\d/g).length > 0) {
        let newShowToLookup = showToLookup.replace(/\d/g, function(something) {
          return romanize(something);
        });

        return tvGuide.getShow(newShowToLookup)
        .then((showsArray) => tvGuide.findShowInMyCountry(showsArray));
      } else {
        throw error;
      }
    } catch (e) {
      throw error;
    }
  })
  .then(tvGuide.getNextEpisode)
  .spread(tvGuide.parseShowAndEpisodeDataToSpeech)
  .catch((error) => tvGuide.errorHanding(error, showToLookup))
  .then((speakString) => { 
    this.emit(':tell', speakString)
  })
  
}

module.exports = ShowAirtimeIntent;