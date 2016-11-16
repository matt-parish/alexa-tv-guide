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
//    "session": {
//      "sessionId": "SessionId.my_session_id",
//      "application": {
//        "applicationId": "amzn1.ask.skill.my_app_id"
//      },
//      "attributes": {},
//      "user": {
//        "userId": "amzn1.ask.account.my_account_id"
//      },
//      "new": true
//    },
//    "request": {
//      "type": "IntentRequest",
//      "requestId": "EdwRequestId.my_request_id",
//      "locale": "en-GB",
//      "timestamp": "2016-11-16T21:49:43Z",
//      "intent": {
//        "name": "ShowCastIntent",
//        "slots": {
//          "Show": {
//            "name": "Show",
//            "value": "planet earth 2"
//          }
//        }
//      }
//    },
//    "version": "1.0"
//  }
//};
//
//handlers[fakeThis.event.request.intent.name].call(fakeThis);
