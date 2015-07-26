console.log('Loading function');

var https = require('https');
var querystring = require("querystring");

// IFTTT Maker Configuration, see https://ifttt.com/maker for more info
var iftttMakerEventName = 'cloudwatch_alarm' // You can use a different IFTTT Maker EventName here
var iftttMakerSecretKey = '<YOUR IFTTT MAKER SECRET KEY>';

var iftttMakerUrl =
    'https://maker.ifttt.com/trigger/'
    + iftttMakerEventName
    + '/with/key/'
    + iftttMakerSecretKey;

exports.handler = function(event, context) {
    var messageText = event.Records[0].Sns.Message;
    console.log('From SNS:', messageText);

    var message = JSON.parse(messageText);
    
    // The output to send, extracting information from the CloudWatch Alarm payload in the SNS message
    var output = message.NewStateValue + ' '
        + message.Region + ' '
        + message.AlarmName;
    console.log('Output: ', output);

    // The output is send as 'value1' to IFTTT Maker 
    var params = querystring.stringify({value1: output});

    https.get(iftttMakerUrl + '?' + params, function(res) {
        console.log("Got response: " + res.statusCode);
        res.setEncoding('utf8');
        res.on('data', function(d) {
            console.log('Body: ' + d);
        });
        context.succeed(res.statusCode);
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
        context.fail(e.message);
    });

};
