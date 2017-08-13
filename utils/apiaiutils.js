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
        var acceptedarray = [];
        acceptedarray.push('car');
        acceptedarray.push('bike');
        acceptedarray.push('cycle');
        console.log(vvalue);
        console.log(acceptedarray);
        switch(body.result.action) {
            case 'guess.name':
                var json = formatApiaiResponse(speech='Yes,you can carry. It is  accepted as checked baggage.', displayText='Yes,you can carry. It is  accepted as checked baggage.')
                response.json(json);
                break;
        }
    }
}


module.exports = {
    fulfillmentRequest
}
