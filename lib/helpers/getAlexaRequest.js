'use strict';

var getAlexaRequest = {
  'slotValue': slotValue,
  'localeInformation': localeInformation
};

function slotValue(request, slot) {
  try {
    let slotValue = request.intent.slots[slot].value;
    if (slotValue === undefined) {
      throw new Error('no slot value defined');
    }
    return slotValue;
  } catch (e) {
    throw new NoValueForSlotError(slot);
  }
}

function localeInformation(request) {
  try {
    let language = request.locale.split('-')[1];
    return language;
  } catch (e) {
    throw new NoLocaleSpecifiedError();
  }
}

// ---------------------------------
// Throwables
// ---------------------------------

class NoValueForSlotError extends Error {
  constructor(slot) {
    super('NoValueForSlotError');
    this.name = 'NoValueForSlotError';
    this.slot = slot;
    this.message = function() {
      return `Sorry, I didnt catch that ${this.slot.toLowerCase()}.  Please try again.`;
    };
  }
}

class NoLocaleSpecifiedError extends Error {
  constructor() {
    super('NoLocaleSpecifiedError');
    this.name = 'NoLocaleSpecifiedError';
    this.message = function() {
      return `Sorry, your location wasn't recognised. Please try again or submit a bug report through the Alexa app.`;
    };
  }
}

getAlexaRequest.throwables = {
  'NoValueForSlotError': NoValueForSlotError,
  'NoLocaleSpecifiedError': NoLocaleSpecifiedError
};

module.exports = getAlexaRequest;