'use strict';

const ShowAirtimeIntent = require('./ShowAirtimeIntent');
const ShowAirtimeFullIntent = require('./ShowAirtimeFullIntent');
const ShowCastIntent = require('./ShowCastIntent');
const ShowChannelIntent = require('./ShowChannelIntent');
const ShowPreviousSummaryIntent = require('./ShowPreviousSummaryIntent');

let handlers = {
  'ShowAirtimeIntent': ShowAirtimeIntent,
  'ShowAirtimeFullIntent': ShowAirtimeFullIntent,
  'ShowCastIntent': ShowCastIntent,
  'ShowChannelIntent': ShowChannelIntent,
  'ShowPreviousSummaryIntent': ShowPreviousSummaryIntent
};

handlers['AMAZON.HelpIntent'] = function() {
  this.emit(':tell',
    `Here are a few things you can ask:
    What time is "Humans" on?,
    When does "Humans" finish,
    Who stars in "Humans",
    What happened in "Humans"`);
};

handlers['LaunchRequest'] = function() {
  this.emit(':ask', 
    `Welcome to t.v. guide.  You can ask me questions
     such as: "What time is 'I'm a celebrity, get me out of here" on`);
};

module.exports = handlers;
