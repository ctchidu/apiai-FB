
fs = require('fs')
var parseXlsx = require('excel')
const request = require('request');

function formatApiaiResponse(speech, displayText) {
    return {
        "speech": speech,
        "displayText": displayText,
        "source": "heroku"
    }
}

function convertToJSON(array) {
  var first = array[0].join()
  var headers = first.split(',');

  var jsonData = [];
  for ( var i = 1, length = array.length; i < length; i++ )
  {

    var myRow = array[i].join();
    var row = myRow.split(',');

    var data = {};
    for ( var x = 0; x < row.length; x++ )
    {
      data[headers[x]] = row[x];
    }
    jsonData.push(data);

  }
  return jsonData;
};

function prepareSendBio() {
  let messageData = {
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [{
            title: 'chidu',
            subtitle: 'chidu1',
            item_url: 'https://www.aircanada.com/content/dam/aircanada/portal/images/content-images/plan/baggage/std-article.png',
            image_url: 'https://www.aircanada.com/content/dam/aircanada/portal/images/content-images/plan/baggage/std-article.png',
            buttons: [{
              type: 'web_url',
              url: 'https://www.aircanada.com/content/dam/aircanada/portal/images/content-images/plan/baggage/std-article.png',
              title: 'testing'
            }],
          }]
        }
      }
    }
  };
console.log(messageData);	
  sendMessage(messageData);
};


function sendMessage(messageData) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: 'EAAU92VlQu5gBANE4l4jQ0tKPkObUyAFttybmmnEOapEVA3aiM7TcAWYZCRn1uT4uPhZCJZB4Kg4R8NLoOIIgpdFpWyyBxUVzKXPzZAa2IeuIzCTzRQ6DLZCir7TOElXNZAecJKncWJTp6UVSfEB4ZB8eb4rP3pxzsWIdigX0FbvNAZDZD'},
    method: 'POST',
    json: messageData
  }, (error, response) => {
    if (error) {
        console.log('Error sending message: ', error);
    } else if (response.body.error) {
        console.log('Error: ', response.body.error);
    }
  });
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
                     var json = formatApiaiResponse(speech='Yes, you can carry it is  accepted as checked baggage.\nFor more queries related to checked baggage, Kindly refer the below link.\nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/special-items.html', 
                     displayText='Yes, you can carry it is  accepted as checked baggage.\nFor more queries related to checked baggage, Kindly refer the below link.\n https://www.aircanada.com/ca/en/aco/home/plan/baggage/special-items.html')
                  
                    }
                    else if(checkRejected.indexOf(splItems) > -1){
                     var json = formatApiaiResponse(speech='No,It is not accepted as checked baggage because of their overall dimensions.\nFor more queries related to checked baggage, Kindly refer the below link. \nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/special-items.html',
                     displayText='No,It is not accepted as checked baggage because of their overall dimensions.\nFor more queries related to checked baggage, Kindly refer the below link. \nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/special-items.html')
                         
                        }else if(restricted.indexOf(splItems) > -1){
                        var json = formatApiaiResponse(speech='No,It is Restricted / Prohibited in either carry-on or checked baggage..\nFor more queries related to Restricted / Prohibited items, Kindly refer the below link. \nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/restricted-and-prohibited-items.html',
                     displayText='No,It is Restricted / Prohibited in either carry-on or checked baggage...\nFor more queries related to Restricted / Prohibited items, Kindly refer the below link. \nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/restricted-and-prohibited-items.html')
                        
                        }else{
                            var json = formatApiaiResponse(speech='Sorry not able to answer you at the moment',displayText='Sorry not able to answer you at the moment')
                        }
    
                
                }   
                else if(typeofbaggage == 'carry on baggage'){
                    
                    if(carryAccepted.indexOf(splItems) > -1){
                       var json = formatApiaiResponse(speech='Yes, you can carry it is  accepted as carry on baggage.\nFor more queries related to carry on baggage, Kindly refer the below link.\nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/carry-on.html', 
                     displayText='Yes, you can carry it is  accepted as carry on baggage.\nFor more queries related to carry on baggage, Kindly refer the below link.\nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/carry-on.html')
                  
                    }
                    else if(restricted.indexOf(splItems) > -1){
                        var json = formatApiaiResponse(speech='No,It is Restricted / Prohibited in either carry-on or checked baggage..\nFor more queries related to Restricted / Prohibited items, Kindly refer the below link. \nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/restricted-and-prohibited-items.html',
                     displayText='No,It is Restricted / Prohibited in either carry-on or checked baggage...\nFor more queries related to Restricted / Prohibited items, Kindly refer the below link. \nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/restricted-and-prohibited-items.html')
                        
                        }
                    else{
                           var json = formatApiaiResponse(speech='No,It is not accepted as carry on baggage because of their overall dimensions.\nFor more queries related to carry on baggage, Kindly refer the below link. \nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/carry-on.html',
                     displayText='No,It is not accepted as carry on baggage because of their overall dimensions.\nFor more queries related to carry on baggage, Kindly refer the below link. \nhttps://www.aircanada.com/ca/en/aco/home/plan/baggage/carry-on.html')
                    
                        }
                    
                }
                
               
             response.json(json);
             break;   
                
         case 'all.items':

		var allitems = body.result.parameters.allitems;
		var typeofbaggage = body.result.parameters.typeofbaggage;	
		if(allitems == 'sports'){
                     prepareSendBio();
                    }
                if(allitems == 'music'){
                        var str = fs.readFileSync('./music.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                    }
                if(allitems == 'hunting'){
                        var str = fs.readFileSync('./hunting.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                    }

                if(allitems == 'restricted'){
                        var str = fs.readFileSync('./restricted.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                    }
		if(typeofbaggage == 'carry on baggage'){
                        var str = fs.readFileSync('./carryon.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
                    }	
                response.json(json);
                break;   
                
                
             case 'payment':   
	      var str = fs.readFileSync('./payment.txt', 'utf8');
	      var json = formatApiaiResponse(speech = str,displayText = str)  
             response.json(json);
             break;
			
			
	     case 'exceldata':
			
		var splItems = body.result.parameters.splItems;	
		
			parseXlsx('exceldata.xlsx', function(err, data) {
 
			var jsonData = JSON.parse(JSON.stringify(convertToJSON(data)));
			for(i = 0; i < jsonData.length; i++){
     
			 if(jsonData[i].NAME == splItems){
				 var json = formatApiaiResponse(speech = jsonData[i].DESCRIPTION,displayText = jsonData[i].DESCRIPTION)
				 response.json(json);
             			 break;
				 }	 
			  }

		});
			
		
		  	
	        			
			
        }
    }
}


module.exports = {
    fulfillmentRequest
}
