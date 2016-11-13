'use strict'; 

const TvGuide = require('../../lib/TvGuide');

function ShowPreviousSummaryIntent() {
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

  tvGuide.getShow(showToLookup)
  .then(tvGuide.getPreviousEpisode)
  .spread((show, previousEpisode) => {
    
    let arrayOfSummaryParagraphs = tvGuide.formatEpisodeSummaryIntoArray(previousEpisode.summary);
    
    let speakString = `In the last episode of the ${show.network.name} show ${show.name}: ${arrayOfSummaryParagraphs[0]}`;
    
    return speakString;
    
  })
  .catch((error) => TvGuide.errorHanding(error, showToLookup))
  .then((speakString) => {
    this.emit(':tell', speakString);
  });
}

module.exports = ShowPreviousSummaryIntent;