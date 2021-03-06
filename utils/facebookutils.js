var request = require('request');
var config = require('../config.js').getConfig();

var apiai = require('apiai')
var api = apiai(config.apiaitoken);


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
console.log('facebook');
		        if((text == 'May I know which country you are travelling to ? Canada or US or Mexico/Caribbean or International') && (action == 'baggagefare')){
			let messageData = {
					  "recipient":{
						"id":sender_id
					  },
					"message":{
						"text": "May I know which country you are travelling to?",
						    "quick_replies":[
							{"content_type":"text",
							"title":"Canada",
							"payload":"CANADA"
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
							"payload":"INTERNATIONAL"
							}    
						    ]
						}
				}	
                sendMessage(messageData);                
           } else if((text == 'May I know in which class you are travelling ? Economy or Premium Economy or Business') && (action == 'baggagefare')){
		   
		   			let messageData = {
					  "recipient":{
						"id":sender_id
					  },
					"message":{
						"text": "May I know in which class you are travelling?",
						    "quick_replies":[
							{"content_type":"text",
							"title":"Economy",
							"payload":"ECONOMY"
							},
							{"content_type":"text",
							"title":"Premium economy",
							"payload":"PREMIUM ECONOMY"
							},
							{"content_type":"text",
							"title":"Business",
							"payload":"BUSINESS"
							}    
						    ]
						}
				}	
		   
		   sendMessage(messageData);
		   
		   }else if((text == 'What is your Air Canada altitude status? NONE or SUPER ELITE 100K or ELITE 75K,ELITE 50K,ELITE 35K or PRESTIGE 25K or STAR ALLIANCE GOLD or STAR ALLIANCE SILVER') && (action == 'baggagefare')){
		   
		   			let messageData = {
					  "recipient":{
						"id":sender_id
					  },
					"message":{
						"text": "May I know your Air Canada altitude status?",
						    "quick_replies":[
							{"content_type":"text",
							"title":"NONE",
							"payload":"NONE"
							},
							{"content_type":"text",
							"title":"SUPER ELITE 100K",
							"payload":"100K"
							},
							{"content_type":"text",
							"title":"ELITE 75K,50K,35K",
							"payload":"75K50K35K"
							},
							{"content_type":"text",
							"title":"PRESTIGE 25K",
							"payload":"25K"
							},
							{"content_type":"text",
							"title":"STAR ALLIANCE GOLD",
							"payload":"GOLD"
							},
							{"content_type":"text",
							"title":"STAR ALLIANCE SILVER",
							"payload":"SILVER"
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
		console.log('google');
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
