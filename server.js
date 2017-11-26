var Jwt = require('jsonwebtoken');
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var util = require('util');
var morgan = require('morgan');
var fs = require('fs');
var http = require('http');
var mongoose=require('mongoose');
var apiRoutes = express.Router();
var UserEmployeeController = require('./controllers/UserEmployeeController.js');
var config = require('./config');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({  extended: true  }));

// For Logging
app.use(morgan('dev'));

app.use(express.static('img'));

app.use(express.static(__dirname + '/public'));


mongoose.connect(config.database,function(err){
    if(err)
        console.log(err);
    else {
        console.log('database connected');
    }
});

//Api Routes
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'DarkNeo Welcome You!!!' });
});

apiRoutes.post('/register', UserEmployeeController.signup);
apiRoutes.post('/login', UserEmployeeController.login);

//Middleware for token validation
apiRoutes.use(function(req, res, next) {
	console.log(req.headers);
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['authorization'];

  if (token) {

    // verifies secret and checks exp
    Jwt.verify(token, config.superSecret, function(err, decoded) {      
      if (err) {
        		return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        UserEmployeeController.updateAccessToken(decoded._id, function(err){
    		console.log(err);
    		if(err){
    			return res.json({ success: false, message: 'Token Expired. Please re-login.' });	
    		}
    		req.decoded = decoded;
    		next();
        });
        
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

//Api to get all the Employee data for the logged in user
apiRoutes.get('/getData', UserEmployeeController.getAllEmployee);
//Api to add a new Employee for the logged in user
apiRoutes.post('/addData', UserEmployeeController.addEmployee);


app.use('/api', apiRoutes);

var server = app.listen(config.port, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})