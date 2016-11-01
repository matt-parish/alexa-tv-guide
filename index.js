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

  // getShow -----------------------------------------------
  let promise = tvGuide.getShow(showToLookup)
  .catch(() => {
    self.emit(':tell', `Sorry, I couldn't find any shows by the name "${showToLookup}"`);
    promise.cancel();
  })

  // findShowInMyCountry------------------------------------
  .then((showsArray) => tvGuide.findShowInMyCountry(showsArray))
  // the above is required for making sure we keep "this" inside the method.
  .catch(() => {
    self.emit(':tell', `Sorry, I couldn't find any shows by the name "${showToLookup}" in your country`);
    promise.cancel();
  })

  // getNextEpisode ----------------------------------------
  .then(tvGuide.getNextEpisode)
  .catch((error) => {
    var networkName = error.show.show.network.name;

    self.emit(':tell', `Sorry, there doesn't seem to be any new episodes for the ${networkName} show "${showToLookup}"`);
    promise.cancel();
  })

  // parseShowAndEpisodeDataToSpeech------------------------
  .spread(tvGuide.parseShowAndEpisodeDataToSpeech)
  .then((speakString) => { 
    self.emit(':tell', speakString)
  })
  .catch((error) => {
    console.log(error);
    self.emit(':tell', `Sorry, something went wrong looking up "${showToLookup}".  Please try again.`);
    promise.cancel();
  });
}

//var fakeThis = {
//  emit: function(tellAsk, message) {
//    console.log(message);
//  }
//}
//
//showAirtimeIntent.call(fakeThis, 'masterchef');