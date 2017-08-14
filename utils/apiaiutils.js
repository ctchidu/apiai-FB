fs = require('fs')

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
        var vvalue = body.result.parameters.sportsitems;
        var acceptedarray = ["Archery equipment – bows and arrows","Archery","Archery equipment","bows","arrows","Avalanche rescue equipment","Avalanche","Bicycles","cycle","cycles",
"Boating/Fishing equipment","Boating","Fishing","Boogie boards","skateboards","Skates","snowboards","Surfboards","paddleboards","kiteboards",
"wakeboards","Broomball","Golf Clubs","golf","Kayaking","Kayaking equipment","Parachutes","parachuting","Racquets","badminton","squash","tennis","Scuba diving",
"Scuba","diving","Skeleton","sleds","Skeleton sleds","balls","ball","bowling balls","Sports balls","Hockey","lacrosse","ringette","cricket","bat","cricket bat",
"cricket ball","curling equipment","curling","wave skis"];
        
    var rejectedarray = ["Bobsleighs","Canoes","Hang gliders","Luges","Vaulting poles","Windsurfing equipment","Windsurfing","gliders"];
        
         
                
        switch(body.result.action) {
            case 'sports.items':
                if (acceptedarray.indexOf(vvalue) > -1) {
                     var json = formatApiaiResponse(speech='Yes, you can carry ' + vvalue +'.'+' It is  accepted as checked baggage.\nFor more queries related to ' + vvalue +' in checked baggage, Kindly refer the below link.\nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/special-items.html', 
                     displayText='Yes, you can carry ' + vvalue +'.'+' It is  accepted as checked baggage.\nFor more queries related to ' + vvalue +' in checked baggage, Kindly refer the below link.\n https://www.aircanada.com/ca/en/aco/home/plan/baggage/special-items.html')
                  } else if(rejectedarray.indexOf(vvalue) > -1){
                         var json = formatApiaiResponse(speech='No,' + vvalue +' is not accepted as checked baggage because of their overall dimensions.\nFor more queries related to ' + vvalue +' in checked baggage, Kindly refer the below link. \nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/special-items.html',
                     displayText='No,' + vvalue +' is not accepted as checked baggage because of their overall dimensions.\nFor more queries related to ' + vvalue +' in checked baggage, Kindly refer the below link. \nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/special-items.html')
                        }else{
                          var json = formatApiaiResponse(speech='Sorry not able to answer you.', displayText='Sorry not able to answer you.')  
                        }
                response.json(json);
                
             case 'sportsall':
                var specialitems = body.result.parameters.specialitems;
                var carryonitems = body.result.parameters.carryonitems;                
                var carryonarray = ["carry on bag","backpack","briefcase","laptop","cat","small dog","duty free purchases","racquet","musical instrument","camera bag","Garment bag","consular bag","diplomatic"];
        
                if(specialitems == 'carryon'){
                       if(carryonarray.indexOf(carryonitems) > -1){
                            var json = formatApiaiResponse(speech='Yes, you can carry ' + carryonitems +'.'+' It is  accepted as carry-on baggage.\nFor more queries related to ' + carryonitems +' in carry-on baggage, Kindly refer the below link.\nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/carry-on.html', 
                            displayText='Yes, you can carry ' + carryonitems +'.'+' It is  accepted as carry-on baggage.\nFor more queries related to ' + carryonitems +' in carry-on baggage, Kindly refer the below link.\nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/carry-on.html')               
                       }
                       else{
                        var str = fs.readFileSync('./carryon.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                           }                        
                    }
                
                
                if(specialitems == 'sports'){
                        var str = fs.readFileSync('./sportsallitems.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                    }
                if(specialitems == 'music'){
                        var str = fs.readFileSync('./music.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                    }
                if(specialitems == 'hunting'){
                        var str = fs.readFileSync('./hunting.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                    }

                if(specialitems == 'restricted'){
                        var str = fs.readFileSync('./restricted.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                    }
                response.json(json);
                break;
                
             case 'baggagefare':   
             
                var travelclass = body.result.parameters.travelclass;
                var locationcountry = body.result.parameters.locationcountry;
                if((travelclass =='economy') {
                   if(locationcountry == 'canada')){
                        var str = fs.readFileSync('./canada.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                }
                 if(locationcountry == 'US')){
                        var str = fs.readFileSync('./us.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                }
                 if(locationcountry == 'SUN')){
                        var str = fs.readFileSync('./sun.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                }
                 if(locationcountry == 'international')){
                        var str = fs.readFileSync('./international.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                }
                       }
               
             response.json(json);
             break;   
                
        }
    }
}


module.exports = {
    fulfillmentRequest
}
