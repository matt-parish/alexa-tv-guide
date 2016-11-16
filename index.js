'use strict';

const Alexa = require('alexa-sdk');

const handlers = require('./handlers');

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.appId = 'amzn1.ask.skill.3905a048-00ff-4dbb-88df-8f39522bf15c';
  alexa.registerHandlers(handlers);
  alexa.execute();
};

// -----------------------------------
// for local testing ----
// -----------------------------------

//var fakeThis = {
//  emit: function(tellAsk, message) {
//    console.log(message);
//  },
//  event: {
//  "session": {
//    "sessionId": "SessionId.[blah]]",
//    "application": {
//      "applicationId": "amzn1.ask.skill.3905a048-00ff-4dbb-88df-8f39522bf15c"
//    },
//    "attributes": {},
//    "user": {
//      "userId": "amzn1.ask.account.[blah]
//    },
//    "new": true
//  },
//  "request": {
//    "type": "IntentRequest",
//    "requestId": "EdwRequestId.f0fd210d-c2bd-420a-8835-c48285b95ba3",
//    "locale": "en-GB",
//    "timestamp": "2016-11-10T23:19:59Z",
//    "intent": {
//      "name": "ShowCastIntent",
//      "slots": {
//        "Show": {
//          "name": "Show",
//          "value": "planet earth 2"
//        }
//      }
//    }
//  },
//  "version": "1.0"
//}
//};
//
//intents[fakeThis.event.request.intent.name].call(fakeThis);
