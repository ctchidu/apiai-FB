var request = require('request');
var config = require('../config.js').getConfig();

var apiai = require('apiai')
var api = apiai(config.apiaitoken);


var facebookGreeting = function(event) {
	var sender_id = event.sender.id;
  var messageData = {
    recipient: {
      id: sender_id
    },
"message": {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "airline_itinerary",
        "intro_message": "Here is your flight itinerary.",
        "locale": "en_US",
        "pnr_number": "ABCDEF",
        "passenger_info": [
          {
            "name": "Farbound Smith Jr",
            "ticket_number": "0741234567890",
            "passenger_id": "p001"
          },
          {
            "name": "Nick Jones",
            "ticket_number": "0741234567891",
            "passenger_id": "p002"
          }
        ],
        "flight_info": [
          {
            "connection_id": "c001",
            "segment_id": "s001",
            "flight_number": "KL9123",
            "aircraft_type": "Boeing 737",
            "departure_airport": {
              "airport_code": "SFO",
              "city": "San Francisco",
              "terminal": "T4",
              "gate": "G8"
            },
            "arrival_airport": {
              "airport_code": "SLC",
              "city": "Salt Lake City",
              "terminal": "T4",
              "gate": "G8"
            },
            "flight_schedule": {
              "departure_time": "2016-01-02T19:45",
              "arrival_time": "2016-01-02T21:20"
            },
            "travel_class": "business"
          },
          {
            "connection_id": "c002",
            "segment_id": "s002",
            "flight_number": "KL321",
            "aircraft_type": "Boeing 747-200",
            "travel_class": "business",
            "departure_airport": {
              "airport_code": "SLC",
              "city": "Salt Lake City",
              "terminal": "T1",
              "gate": "G33"
            },
            "arrival_airport": {
              "airport_code": "AMS",
              "city": "Amsterdam",
              "terminal": "T1",
              "gate": "G33"
            },
            "flight_schedule": {
              "departure_time": "2016-01-02T22:45",
              "arrival_time": "2016-01-03T17:20"
            }
          }
        ],
        "passenger_segment_info": [
          {
            "segment_id": "s001",
            "passenger_id": "p001",
            "seat": "12A",
            "seat_type": "Business"
          },
          {
            "segment_id": "s001",
            "passenger_id": "p002",
            "seat": "12B",
            "seat_type": "Business"
          },
          {
            "segment_id": "s002",
            "passenger_id": "p001",
            "seat": "73A",
            "seat_type": "World Business",
            "product_info": [
              {
                "title": "Lounge",
                "value": "Complimentary lounge access"
              },
              {
                "title": "Baggage",
                "value": "1 extra bag 50lbs"
              }
            ]
          },
          {
            "segment_id": "s002",
            "passenger_id": "p002",
            "seat": "73B",
            "seat_type": "World Business",
            "product_info": [
              {
                "title": "Lounge",
                "value": "Complimentary lounge access"
              },
              {
                "title": "Baggage",
                "value": "1 extra bag 50lbs"
              }
            ]
          }
        ],
        "price_info": [
          {
            "title": "Fuel surcharge",
            "amount": "1597",
            "currency": "USD"
          }
        ],
        "base_price": "12206",
        "tax": "200",
        "total_price": "14003",
        "currency": "USD"
      }
    }
  }
  };	
                sendMessage(messageData);
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




module.exports = {	
    facebookGreeting
}
