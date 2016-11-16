'use strict'; 

const TvGuide = require('../../lib/TvGuide');

const getAlexaRequest = require('../../lib/helpers/getAlexaRequest');

function ShowPreviousSummaryIntent() {
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
