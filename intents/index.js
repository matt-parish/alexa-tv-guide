'use strict';

const ShowAirtimeIntent = require('./ShowAirtimeIntent');
const ShowAirtimeFullIntent = require('./ShowAirtimeFullIntent');
const ShowCastIntent = require('./ShowCastIntent');
const ShowPreviousSummaryIntent = require('./ShowPreviousSummaryIntent');

module.exports = {
  'ShowAirtimeIntent': ShowAirtimeIntent,
  'ShowAirtimeFullIntent': ShowAirtimeFullIntent,
  'ShowCastIntent': ShowCastIntent,
  'ShowPreviousSummaryIntent': ShowPreviousSummaryIntent
};
