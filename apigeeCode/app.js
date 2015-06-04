//node app- Rest API , Apigee code project
//developed by: Andrew Mendez

/*
*   Overall functionality:
* REST API - Recieve text and send JSON
*  Connect to MongoDB database
*
* Recieve text input of a zicode - 5 numbers
*	Connect to MongoDB database, will be geo-indexed
*    Return list of stores that are within 10 mile radius
*		- will be in JSON format
*
*/

/*
*  NOTE on data in MongoDB database:
* api will submit JSON data about:
*	- the store, its address
*	-the phone number of the store
*	-list of hair stylist that are working in that store. 
*
*	For each hair stylist, there will be:
*	- a phone number to allow the user to set up an appointment with the hair stylist 
*	- a rating of their performance, decimal number on a 4.0 scale, 0.0 (worst scor) to 4.0 (best score). 
*
*
*
*
*
*
*/

//1) recieve text input and display output on webpage
// 2) learn to connect to MongoDB database, 
//  3) check if MongoDB functionality will allow geolocation from zipcode
// 4) develop REST API 
var http=require('http');
var url = require('url');

var root = __dirname;
var mongodb = require('mongodb');
var server = new mongodb.Server('127.0.0.1',27017,{});

var client = new mongodb.Db('db',server,{w:1});

//module to loop up cities based on zipcodes ot GPS coordinates
var cities = require('cities');

var qs = require('querystring');

var items = [];

//client.open();
http.createServer(function(req, res){
  
  //using switch cases to determine if the request was a GET request or POST request
    switch (req.method) {
      case 'GET':
      //res.end("Hello");
       client.open(function(err){
        var collection = client.collection("places");

 

//collection.insert({hello:'test123'});
collection.insert({loc : { type: "Point", coordinates: [ 26.2156678, -80.241767 ] },name: "Floyd’s Barber Shop Tamarac",address: "1277 Dead Lane, Southwest Tamarac FL 32826",number: "954-123-7685",hairstylist:"Janet"});






      

        var res = cities.zip_lookup(33330);
console.log(res.latitude+" , "+res.longitude);
   // client.executeDbCommand(geoNear:"places"
  //here, will convert zipcode to geo location
  //next, pass gps coordinates to mongoDB database, then retieve all local shops

        if(err) {throw err;}
     


      });
	show(res);
        break;
      case 'POST':
       add(req, res);
        break;
      default:

     
        //badRequest(res);
    }
  
   }).listen(3000,'0.0.0.0');

function show(res) {
  var html = '<html><head><title>API Example</title></head><body>'
+ '<h1>Enter zipcode</h1>'
+ '<ul>'+ items.map(function(item){ return '<li>' + item + '</li>' }).join('')+ '</ul>'
           + '<form method="post" action="/">'
           + '<p><input type="text" name="item" /></p>'
           + '<p><input type="submit" value="Add Item" /></p>'
           + '</form></body></html>';
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
}

/*
This function will accept input from the text box from the user and display results on webpage

when event is emmitted that data is being recieved, then pass info to MongoDB database
*/
function add(req, res){
 var body = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk){ body += chunk });
  req.on('end', function(){
    var obj = qs.parse(body);

    items.push("result");

    //here, pass zipcode entered in text box and retrieve database

    show(res);
});
}

