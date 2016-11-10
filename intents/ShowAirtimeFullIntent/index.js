'use strict';

const moment = require('moment');
const Promise = require('bluebird');

const TvGuide = require('../../TvGuide');
const constants = require('./../../lib/constants')

// make an intenthandlers file, and thne a file for each intent.
// and a file for the core calls to the api.
// that'll clean this file up massively.
function ShowruntimeFullIntent() {
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

      // Turn runtime in minutes into a speech string

      let runtimeHours = Math.floor(episodeData.runtime / 60);
      let runtimeMinutes = episodeData.runtime % 60;
      let runtimeSpeech = '';

      if (runtimeHours > 1) {
        runtimeSpeech += `${runtimeHours} hours `;
      } else if (runtimeHours > 0) {
        runtimeSpeech += `1 hour`;
      }

      if (runtimeHours > 0 && runtimeMinutes > 0) {
        runtimeSpeech += ` and `;
      }

      if (runtimeMinutes > 0) {
        runtimeSpeech += `${runtimeMinutes} minutes`;
      }

      let endDate = moment(episodeData.airstamp)
      .add(episodeData.runtime, 'm')
      .calendar(moment(episodeData.airstamp), constants.CALENDAR_SPEECH_FORMAT_RELATIVE);

      let speakString = `
        The next episode of the ${networkName} show ${showName} airs ${niceDate}, and finishes ${runtimeSpeech} later ${endDate}
      `;

      return speakString;
    })
    .catch((err) => {
      console.log(err);
      throw new TvGuide.throwables.GenericShowLookupError();
    });
  })

  .catch((error) => tvGuide.errorHanding(error, showToLookup))
  .then((speakString) => {
    this.emit(':tell', speakString)
  })
}

module.exports = ShowruntimeFullIntent;
