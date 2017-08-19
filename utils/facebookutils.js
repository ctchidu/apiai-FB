var request = require('request');
var config = require('../config.js').getConfig();

var apiai = require('apiai')
var api = apiai(config.apiaitoken);


function prepareSendBio(sender) {
  let messageData = {
    recipient: {
      id: sender
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [{
            title: 'BagBot',
            buttons: [{
              type: 'web_url',
              url: 'https://www.google.com/',
              title: 'Economy'
            }],
          }]
        }
      }
    }
  };
    console.log('ready buttons');
  sendMessage(messageData);
}


var handleFacebookTextMessage = function(event) {
    console.log('testing 1');
    var question = event.message.text;
    var sender_id = event.sender.id;
    var recipient_id = event.recipient.id;
    
    console.log(question);
    console.log(sender_id);
    console.log(recipient_id);

    if (!question | !sender_id | !recipient_id) {
        console.log('Event is partially defined. Missing question, sender or recipient.');
    } else {
        console.log('i am last');
        
if(question = 'test'){
    console.log('prepare buttons');
prepareSendBio(sender_id);
}
        
        
        
    }
}

// Send a message via the Facebook Graph API
var sendMessage = function(messageData) {
    request({
        uri: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: config.facebook.pageAccessToken },
        method: "POST",
        json: messageData
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            if (messageId) {
                console.log("Successfully sent message with id %s to recipient %s",
                messageId, recipientId);
                console.log('chidu');
            } else {
                console.log("Successfully called Send API for recipient %s",
                recipientId);
            }
        } else {
            console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
        }
    });
}

// Responds a message based on text and id of the receiver
var replyMessage = function(recipientId, fulfillment) {
    var speech = fulfillment.speech;
    if ((speech != undefined) & (speech != "")) {
        const messageData = {
            recipient: {
                id: recipientId,
            },
            message: {
                text: speech
            }
        }
        sendMessage(messageData);
    } else {
        console.log('Facebook message is either empty or undefined.');
    }
}

module.exports = {
    handleFacebookTextMessage
}
