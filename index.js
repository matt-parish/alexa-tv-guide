'use strict';

const Alexa = require('alexa-sdk');

const intents = require('./intents');

var handlers = intents;

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.appId = 'amzn1.ask.skill.3905a048-00ff-4dbb-88df-8f39522bf15c';
  alexa.registerHandlers(handlers);
  alexa.execute();
};

// -----------------------------------

var fakeThis = {
  emit: function(tellAsk, message) {
    console.log(message);
  },
  event: {
  "session": {
    "sessionId": "SessionId.a48ab057-ec4a-4271-a647-6ba0bdee4be2",
    "application": {
      "applicationId": "amzn1.ask.skill.3905a048-00ff-4dbb-88df-8f39522bf15c"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.AG2EODC3BMQS5AIQXLKSVOVEUK2HFH7X6L5ZSSIZSGIGWBLWGNUJ7U3CWOMWM3RTE7WA6FSSBE7MGSA4UQTZQ5OYPJBTD7EV4TWJV3SWZW6OMAIA3ED7I6HMHUDBSQCXSFXCU2ZDJ6NME5ZGTXMKXOTXHFK7ZMWUMC6F5V3JL7AAGFBLDUXT6KEAWDMMT5A6ERYP4EKRGGZESLA"
    },
    "new": true
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.f0fd210d-c2bd-420a-8835-c48285b95ba3",
    "locale": "en-GB",
    "timestamp": "2016-11-10T23:19:59Z",
    "intent": {
      "name": "ShowPreviousSummaryIntent",
      "slots": {
        "Show": {
          "name": "Show",
          "value": "british bake off"
        }
      }
    }
  },
  "version": "1.0"
}
};

intents[fakeThis.event.request.intent.name].call(fakeThis);
