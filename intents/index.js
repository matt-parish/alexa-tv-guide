'use strict';

const ShowAirtimeIntent = require('./ShowAirtimeIntent');
const ShowAirtimeFullIntent = require('./ShowAirtimeFullIntent');
const ShowCastIntent = require('./ShowCastIntent');
const ShowChannelIntent = require('./ShowChannelIntent');
const ShowPreviousSummaryIntent = require('./ShowPreviousSummaryIntent');

let intents = {
  'ShowAirtimeIntent': ShowAirtimeIntent,
  'ShowAirtimeFullIntent': ShowAirtimeFullIntent,
  'ShowCastIntent': ShowCastIntent,
  'ShowChannelIntent': ShowChannelIntent,
  'ShowPreviousSummaryIntent': ShowPreviousSummaryIntent
};

intents['AMAZON.HelpIntent'] = function() {
  this.emit(':tell',
    `Here are a few things you can ask:
    What time is "Humans" on?,
    When does "Humans" finish,
    Who stars in "Humans",
    What happened in "Humans"`);
};

module.exports = intents;
