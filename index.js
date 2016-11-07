'use strict';

const Alexa = require('alexa-sdk');

const intents = require('./intents');

const romanize = require('./lib/romanize');

var handlers = intents;

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

// -----------------------------------

var fakeThis = {
  emit: function(tellAsk, message) {
    console.log(message);
  }
}

intents.ShowAirtimeIntent.call(fakeThis, 'planet earth 2');