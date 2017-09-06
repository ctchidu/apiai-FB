
fs = require('fs')
var parseXlsx = require('excel')
var config = require('../config.js').getConfig();
var jsonData;


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

	  	parseXlsx('BAG_FARE_DATA.xlsx', function(err, data) {			
		 jsonData = JSON.parse(JSON.stringify(convertToJSON(data)));
		console.log('getting data');	
		});


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
             
		var locationcountry = body.result.parameters.locationcountry;
                var travelclass = body.result.parameters.travelclass;
		var frequentfly = body.result.parameters.frequentfly;
		var str;

		if(frequentfly){
		var locationcountry = locationcountry.toUpperCase();
                var travelclass = travelclass.toUpperCase();
		var frequentfly = frequentfly.toUpperCase();
			
		for(i = 0; i < jsonData.length; i++){
		 if((jsonData[i].COUNTRY == locationcountry) && (jsonData[i].ALTITUDE == frequentfly) && (jsonData[i].CLASS == travelclass)){	
			      str = formatApiaiResponse(speech = jsonData[i].FARE,displayText = jsonData[i].FARE);
			    response.json(str);	 			 
			 }				 
		  }
									
			
			
		}
		
		break;
                
         case 'all.items':

		var allitems = body.result.parameters.allitems;
		var typeofbaggage = body.result.parameters.typeofbaggage;	
		if(allitems == 'sports'){
                        var str = fs.readFileSync('./sportsallitems.txt', 'utf8');
                        var json = formatApiaiResponse(speech = str,displayText = str)
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
		if(allitems == 'carry on baggage'){
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
 		var a = true;	
			var jsonData = JSON.parse(JSON.stringify(convertToJSON(data)));
			for(i = 0; i < jsonData.length; i++){
     
			 if(jsonData[i].NAME == splItems){
				 var a = false;
				 var json = formatApiaiResponse(speech = jsonData[i].DESCRIPTION,displayText = jsonData[i].DESCRIPTION)
				 response.json(json);
             			 break;
				 }	 
			  }		
		if(a){
		      var str = fs.readFileSync('./fallback.txt', 'utf8');
		      var json = formatApiaiResponse(speech = str,displayText = str)  
		     response.json(json);
  		 }
		});        			
	break;
			
        }
    }
}


module.exports = {
    fulfillmentRequest
}
