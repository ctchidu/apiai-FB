var request = require('request');
var config = require('../config.js').getConfig();

var apiai = require('apiai')
var api = apiai(config.apiaitoken);


var facebookGreeting = function(event) {
	var sender_id = event.sender.id;
		let messageData = {
			  "recipient":{
				"id":sender_id
			  },
			"message":{
				"text": "Hello!! Warm Greetings :) How can I help you with Baggage related queries ?",
				}
		}	
                sendMessage(messageData);
}



var handleFacebookTextMessage = function(event) {
    var question = event.message.text;
    var sender_id = event.sender.id;
    var recipient_id = event.recipient.id;

    if (!question | !sender_id | !recipient_id) {
        console.log('Event is partially defined. Missing question, sender or recipient.');
    } else {
      
        var req_bot = api.textRequest(question, {
            sessionId: sender_id
        });

        req_bot.on('response', function(response_bot) {
            var text = response_bot.result.fulfillment.speech;
            var action = response_bot.result.action;

		        if((text == 'May I know which country you are travelling to ? Canada OR US OR Mexico/Caribbean OR International') && (action == 'baggagefare')){
			let messageData = {
					  "recipient":{
						"id":sender_id
					  },
					"message":{
						"text": "May I know which country you are travelling to ? Canada  OR  US  OR Mexico/Caribbean  OR  International",
						    "quick_replies":[
							{"content_type":"text",
							"title":"Canada",
							"payload":"canada"
							},
							{"content_type":"text",
							"title":"U.S",
							"payload":"US"
							},
							{"content_type":"text",
							"title":"Mexico/Caribbean",
							"payload":"SUN"
							},
							{"content_type":"text",
							"title":"International",
							"payload":"International"
							}    
						    ]
						}
				}	
                sendMessage(messageData);                
           } else if((text == 'May I know in which class you are travelling ? Economy OR Premium Economy OR Business') && (action == 'baggagefare')){
		   
		   			let messageData = {
					  "recipient":{
						"id":sender_id
					  },
					"message":{
						"text": "May I know in which class you are travelling ?  Economy   OR  Premium Economy  OR  Business",
						    "quick_replies":[
							{"content_type":"text",
							"title":"Economy",
							"payload":"economy"
							},
							{"content_type":"text",
							"title":"Premium economy",
							"payload":"premium economy"
							},
							{"content_type":"text",
							"title":"Business",
							"payload":"business"
							}    
						    ]
						}
				}	
		   
		   sendMessage(messageData);
		   
		   }else if((text == 'You want to know about? Sports or Music or Hunting or Restricted items or Carry on baggage') && (action == 'all.items')){
			    
		   			let messageData = {
					  "recipient":{
						"id":sender_id
					  },
					"message":{
						"text": "You want to know about? Sports  or Music  or Hunting  or Restricted items or Carry on baggage",
						    "quick_replies":[
							{"content_type":"text",
							"title":"Sports",
							"payload":"sports"
							},
							{"content_type":"text",
							"title":"Music",
							"payload":"music"
							},
							{"content_type":"text",
							"title":"Hunting",
							"payload":"hunting"
							},
							{"content_type":"text",
							"title":"Restricted items",
							"payload":"restricted"
							},
							{"content_type":"text",
							"title":"Carry on baggage",
							"payload":"Carry on baggage"
							}    
						    ]
						}
				}	
                sendMessage(messageData); 
		   
		   }
		
		
		
		else{
		

            replyMessage(sender_id, response_bot.result.fulfillment);
		}	
        });

        req_bot.on('error', function(error_bot) {
            console.log("Couldn't answer the question");
            console.log(error_bot);
            replyMessage(sender_id, 'Une erreur est survenue. Un opérateur va prendre le relais d\'ici peu.');
        })
    
        req_bot.end();
	   
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

module.exports = {
    facebookGreeting
}


