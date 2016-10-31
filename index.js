'use strict';

const TvGuide = require('./TvGuide');

var tvGuide = new TvGuide('GB');

tvGuide.getShow('humans')
.then((showsArray) => tvGuide.findShowInMyCountry(showsArray))
// the above is required for making sure we keep "this"
.then(tvGuide.getNextEpisode)
.spread(tvGuide.parseShowAndEpisodeDataToSpeech)
.then((speakString) => console.log(speakString));

