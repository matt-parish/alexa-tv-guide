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


function showAirtimeIntent(show) {
  let self = this;
  
  let showToLookup;
  
  if (show) {
    // useful for testing locally
    showToLookup = show; 
  } else {
    showToLookup= this.event.request.intent.slots.Show.value;
  }

  let tvGuide = new TvGuide('GB');


  // ---------------------------------------------------
  
  // getShow -----------------------------------------------
  let promise = tvGuide.getShow(showToLookup)
  .then((showsArray) => tvGuide.findShowInMyCountry(showsArray))
  // the above is required for making sure we keep "this" inside the method.
  .then(tvGuide.getNextEpisode)
  .spread(tvGuide.parseShowAndEpisodeDataToSpeech)
  .catch((error) => tvGuide.errorHanding(error, showToLookup))
  .then((speakString) => { 
    self.emit(':tell', speakString)
  })
  
}

var fakeThis = {
  emit: function(tellAsk, message) {
    console.log(message);
  }
}

showAirtimeIntent.call(fakeThis, 'strictly come dancing');