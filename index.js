'use strict';

const Alexa = require('alexa-sdk');

const TvGuide = require('./TvGuide');

var handlers = {
  'ShowAirtimeIntent': showAirtimeIntent
}

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

// make an intenthandlers file, and thne a file for each intent.
// and a file for the core calls to the api.
// that'll clean this file up massively.
function showAirtimeIntent(show) {
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
  .then(tvGuide.getNextEpisode)
  .spread(tvGuide.parseShowAndEpisodeDataToSpeech)
  .catch((error) => tvGuide.errorHanding(error, showToLookup))
  .then((speakString) => { 
    this.emit(':tell', speakString)
  })
  
}

var fakeThis = {
  emit: function(tellAsk, message) {
    console.log(message);
  }
}

showAirtimeIntent.call(fakeThis, 'strictly come dancing');