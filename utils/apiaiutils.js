function formatApiaiResponse(speech, displayText) {
    return {
        "speech": speech,
        "displayText": displayText,
        "source": "heroku"
    }
}


var fulfillmentRequest = function(request, response) {
    var body = request.body;
    if (!body | !body.result.action) {
        console.log('missing action in request.');
    } else {
        console.log('Valid fulfillment request received.');
        var action = body.result.action;
        var parameters = body.result.parameters;
        var vvalue = body.result.parameters.vechiles;
        var acceptedarray = ["Archery equipment – bows and arrows","Archery","Archery equipment","bows","arrows","Avalanche rescue equipment","Avalanche","Bicycles","cycle","cycles",
"Boating/Fishing equipment","Boating","Fishing","Boogie boards","skateboards","Skates","snowboards","Surfboards","paddleboards","kiteboards",
"wakeboards","Broomball","Golf Clubs","golf","Kayaking","Kayaking equipment","Parachutes","parachuting","Racquets","badminton","squash","tennis","Scuba diving",
"Scuba","diving","Skeleton","sleds","Skeleton sleds","balls","ball","bowling balls","Sports balls","Hockey","lacrosse","ringette","cricket","bat","cricket bat",
"cricket ball","curling equipment","curling","wave skis"];
        
    var rejectedarray = ["Bobsleighs","Canoes","Hang gliders","Luges","Vaulting poles","Windsurfing equipment","Windsurfing","gliders"];
        
        switch(body.result.action) {
            case 'guess.name':
                if (acceptedarray.indexOf(vvalue) > -1) {
                     var json = formatApiaiResponse(speech='Yes, you can carry. It is  accepted as checked baggage.', displayText='Yes, you can carry. It is  accepted as checked baggage.')
                  } else if(rejectedarray.indexOf(vvalue) > -1){
                         var json = formatApiaiResponse(speech='No, not accepted as checked baggage because of their overall dimensions.', displayText='No, not accepted as checked baggage because of their overall dimensions.')
                        }else{
                          var json = formatApiaiResponse(speech='Sorry not able to answer you.', displayText='Sorry not able to answer you.')  
                        }
                response.json(json);
                break;
        }
    }
}


module.exports = {
    fulfillmentRequest
}
