
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
                              
        switch(body.result.action) {
              
             case 'baggagefare':   
             
                var travelclass = body.result.parameters.travelclass;
                var locationcountry = body.result.parameters.locationcountry;
                if(travelclass =='economy') {
                   if(locationcountry == 'canada'){
                        var str = fs.readFileSync('./canada.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                }
                 if(locationcountry == 'US'){
                        var str = fs.readFileSync('./us.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                }
                 if(locationcountry == 'SUN'){
                        var str = fs.readFileSync('./sun.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                }
                 if(locationcountry == 'international'){
                        var str = fs.readFileSync('./international.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                }
                       }
                
                
                if(travelclass =='premium economy') {
                   if(locationcountry == 'canada'){
                        var str = fs.readFileSync('./premiumcanada.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                }
                 if(locationcountry == 'US'){
                        var str = fs.readFileSync('./premiumus.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                }
                 if(locationcountry == 'SUN'){
                        var str = fs.readFileSync('./premiumsun.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                }
                 if(locationcountry == 'international'){
                        var str = fs.readFileSync('./premiuminternational.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                }
                       }
                
                
                if(travelclass =='business') {
                   if(locationcountry == 'canada'){
                        var str = fs.readFileSync('./businesscanada.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                }
                 if(locationcountry == 'US'){
                        var str = fs.readFileSync('./businessus.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                }
                 if(locationcountry == 'SUN'){
                        var str = fs.readFileSync('./businesssun.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                }
                 if(locationcountry == 'international'){
                        var str = fs.readFileSync('./businessinternational.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                }
                       }
              
             response.json(json);
             break;
                
                
             case 'checkedcarryon':
                
                var checkAccepted = ["Archery equipment – bows and arrows","Archery equipment – bows and arrows","Archery equipment",
                    "bows and arrows","bows","arrows","Avalanche rescue equipment","Avalanche rescue equipment",
                    "Bicycles","Bicycles","cycle","cycles","Boating/Fishing equipment","Boating/Fishing equipment",
                    "Boating","Fishing","Fishing equipment","Boating equipment","Boogie boards","Boogie boards","skim",
                    "speed","skateboards","Skates","Skeleton Sleds","Skis","snowboards","Broomball","Broomball",
                    "curling equipment","curling equipment","Golf Clubs","Golf Clubs","golf","golf stick",
                    "Hockey","Hockey","lacrosse","ringette","cricket","cricket equipment",
                    "Kayaking equipment","Kayaking equipment","Kayaking",
                    "Parachutes","Parachutes","parachuting","parachuting equipment",
                    "Racquets","Racquets","badminton","squash","tennis",
                    "Scuba diving equipment","Scuba diving equipment","Scuba diving","scuba","diving",
                    "bowling balls","bowling balls","Sports balls","balls","ball",
                    "Surfboards","paddleboards","kiteboards","wakeboards","wave skis","Carry-on bag","Carry-on bag","carry on bag","roller bag","backpack","briefcase",
                    "laptop","laptop",
                    "Cat","Cat","small dog","pets",
                    "duty-free purchases","duty-free purchases","duty free",
                    "Sport racquet","Sport racquet","tennis","squash","badminton","musical instrument",
                    "Camera bag","Camera bag","diplomatic","consular bag","Garment bag",
                    "guitars","guitars","violins","violas","golf club"];
                
                
                
                 var checkRejected = ["Bobsleighs","Bobsleighs",
                        "Canoes","Canoes",
                        "Hang gliders","Hang gliders","gliders",
                        "Luges","Luges",
                        "Vaulting poles","Vaulting poles","vaulting",
                        "Windsurfing equipment","Windsurfing equipment","Windsurfing"];
                
    var carryAccepted = ["Carry-on bag","Carry-on bag","carry on bag","roller bag","backpack","briefcase",
                        "laptop","laptop",
                        "Cat","Cat","small dog","pets",
                        "duty-free purchases","duty-free purchases","duty free",
                        "Sport racquet","Sport racquet","tennis","squash","badminton","musical instrument",
                        "Camera bag","Camera bag","diplomatic","consular bag","Garment bag",
                        "guitars","guitars","violins","violas"];

            var restricted = ["Batteries","Batteries",
                        "Battery-powered","Battery-powered","battery powered",
                        "Camping Equipment","Camping Equipment",
                        "Curling Irons","Curling Irons","Lighters",
                        "Dry ice","Dry ice","Brine","Gel","ice Packs","Liquids",
                        "aerosols","aerosols","toiletries","alcoholic beverages","alcohol",
                        "Meals","Meals","Ready-to-eat","ready to eat",
                        "Oxygen","Oxygen",
                        "Air Purifiers","Air Purifiers","Ionizers",
                        "Avalanche Rescue Backpacks","Avalanche Rescue Backpacks",
                        "Compressed Gas","Compressed Gas","Cylinders",
                        "Corrosive","Corrosive","Oxidizing Materials","oxidize",
                        "Defence","Defence","Incapacitating","Explosives",
                        "Firearms","Firearms","Ammunition",
                        "Fuel-powered Equipment","Fuel-powered Equipment","Fuel powered",
                        "Paint","Paint","Poisons","Toxins",
                        "Radioactive Materials","Radioactive Materials",
                        "Security Attaché Cases","Security Attaché Cases"];  
              
                var typeofbaggage = body.result.parameters.typeofbaggage;
                var splItems = body.result.parameters.splItems;
                
             
                   if(typeofbaggage == 'checked baggage')
                {
                    if(checkAccepted.indexOf(splItems) > -1){
                     var json = formatApiaiResponse(speech='Yes, you can carry ' + splItems +'.'+' It is  accepted as checked baggage.\nFor more queries related to ' + splItems +' in checked baggage, Kindly refer the below link.\nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/special-items.html', 
                     displayText='Yes, you can carry ' + splItems +'.'+' It is  accepted as checked baggage.\nFor more queries related to ' + splItems +' in checked baggage, Kindly refer the below link.\n https://www.aircanada.com/ca/en/aco/home/plan/baggage/special-items.html')
                  
                    }
                    else if(checkRejected.indexOf(splItems) > -1){
                     var json = formatApiaiResponse(speech='No,' + splItems +' is not accepted as checked baggage because of their overall dimensions.\nFor more queries related to ' + splItems +' in checked baggage, Kindly refer the below link. \nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/special-items.html',
                     displayText='No,' + splItems +' is not accepted as checked baggage because of their overall dimensions.\nFor more queries related to ' + splItems +' in checked baggage, Kindly refer the below link. \nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/special-items.html')
                         
                        }else if(restricted.indexOf(splItems) > -1){
                        var json = formatApiaiResponse(speech='No,' + splItems +' is Restricted / Prohibited in either carry-on or checked baggage..\nFor more queries related to ' + splItems +' in checked baggage, Kindly refer the below link. \nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/restricted-and-prohibited-items.html',
                     displayText='No,' + splItems +' is Restricted / Prohibited in either carry-on or checked baggage...\nFor more queries related to ' + splItems +' in checked baggage, Kindly refer the below link. \nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/restricted-and-prohibited-items.html')
                        
                        }else{
                            var json = formatApiaiResponse(speech='Sorry not able to answer you at the moment',displayText='Sorry not able to answer you at the moment')
                        }
    
                
                }   
                else if(typeofbaggage == 'carry on baggage'){
                    
                    if(checkAccepted.indexOf(splItems) > -1){
                       var json = formatApiaiResponse(speech='Yes, you can carry ' + splItems +'.'+' It is  accepted as carry on baggage.\nFor more queries related to ' + splItems +' in carry on baggage, Kindly refer the below link.\nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/carry-on.html', 
                     displayText='Yes, you can carry ' + splItems +'.'+' It is  accepted as carry on baggage.\nFor more queries related to ' + splItems +' in carry on baggage, Kindly refer the below link.\nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/carry-on.html')
                  
                    }
                    else if(restricted.indexOf(splItems) > -1){
                        var json = formatApiaiResponse(speech='No,' + splItems +' is Restricted / Prohibited in either carry-on or checked baggage..\nFor more queries related to ' + splItems +' in carry-on baggage, Kindly refer the below link. \nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/restricted-and-prohibited-items.html',
                     displayText='No,' + splItems +' is Restricted / Prohibited in either carry-on or checked baggage...\nFor more queries related to ' + splItems +' in carry-on baggage, Kindly refer the below link. \nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/restricted-and-prohibited-items.html')
                        
                        }
                    else{
                           var json = formatApiaiResponse(speech='No,' + splItems +' is not accepted as carry on baggage because of their overall dimensions.\nFor more queries related to ' + splItems +' in carry on baggage, Kindly refer the below link. \nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/carry-on.html',
                     displayText='No,' + splItems +' is not accepted as carry on baggage because of their overall dimensions.\nFor more queries related to ' + splItems +' in carry on baggage, Kindly refer the below link. \nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/carry-on.html')
                    
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
