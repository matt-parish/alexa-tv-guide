'use strict';

const moment = require('moment');
const Promise = require('bluebird');

const getAlexaRequest = require('../../lib/helpers/getAlexaRequest');

const TvGuide = require('../../lib/TvGuide');
const constants = require('./../../lib/helpers/constants');

function ShowruntimeFullIntent() {
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

  .catch((error) => TvGuide.errorHanding(error, showToLookup))
  .then((speakString) => {
    this.emit(':tell', speakString);
  });
}

module.exports = ShowruntimeFullIntent;
