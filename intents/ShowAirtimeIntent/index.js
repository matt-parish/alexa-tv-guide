'use strict'; 

const moment = require('moment');
const Promise = require('bluebird');

const TvGuide = require('../../TvGuide');
const constants = require('./../../lib/constants')

function ShowAirtimeIntent() {
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
  
  tvGuide.getShows(showToLookup)
  .then((showsArray) => tvGuide.findShowInMyCountry(showsArray, showToLookup))
  // the above is required for making sure we keep "this" inside the method.
  .then(tvGuide.getNextEpisode)
  .spread(function parseShowAndEpisodeDataToSpeech(show, episodeData) {

    return new Promise.try(() => {
      let networkName = show.show.network.name;

      let showName = show.show.name;

      let niceDate = moment(episodeData.airstamp)
        .calendar(null, constants.CALENDAR_SPEECH_FORMAT);

      let speakString = `
        The next episode of the ${networkName} show ${showName} airs ${niceDate}
      `;

      return speakString;
    })
    .catch((err) => {
      console.log(err);
      throw new TvGuide.throwables.GenericShowLookupError();
    });
  })

  .catch((error) => TvGuide.errorHanding(error, showToLookup))
  .then((speakString) => { 
    this.emit(':tell', speakString)
  })
  
}

module.exports = ShowAirtimeIntent;
