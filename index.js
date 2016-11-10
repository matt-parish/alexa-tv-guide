'use strict';

const Alexa = require('alexa-sdk');

const intents = require('./intents');

var handlers = intents;

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

// -----------------------------------

//var fakeThis = {
//  emit: function(tellAsk, message) {
//    console.log(message);
//  },
//  event: {
//    "session": {
//      "new": false,
//      "sessionId": "session1234",
//      "attributes": {},
//      "user": {
//        "userId": null
//      },
//      "application": {
//        "applicationId": "amzn1.echo-sdk-ams.app.[unique-value-here]"
//      }
//    },
//    "version": "1.0",
//    "request": {
//      "intent": {
//        "slots": {
//          "Show": {
//            "name": "Show",
//            "value": "humans"
//          }
//        },
//        "name": "ShowAirtimeIntent"
//      },
//      "type": "IntentRequest",
//      "requestId": "request5678"
//    }
//  }
//}
//
//intents[fakeThis.event.request.intent.name].call(fakeThis);
