'use strict'; 

const moment = require('moment');
const Promise = require('bluebird');

const TvGuide = require('../../lib/TvGuide');
const constants = require('./../../lib/helpers/constants');

function ShowChannelIntent() {
  let showToLookup;
  let language;

  try {
    showToLookup = this.event.request.intent.slots.Show.value;

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
  .then((show) => {
    let showName = show.show.name;
    let networkName = show.show.network.name;
    
    return `${showName} airs on ${networkName}.`;
  })
  .catch((error) => TvGuide.errorHanding(error, showToLookup))
  .then((speakString) => {
    this.emit(':tell', speakString);
  });
}

module.exports = ShowChannelIntent;