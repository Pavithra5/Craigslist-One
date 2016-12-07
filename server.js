// server.js

// modules =================================================
var express        	= require('express');
var app            	= express();
var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');
var mongoose		= require('mongoose');
const passport 		= require('passport')  
const session 		= require('express-session')  
const RedisStore 	= require('connect-redis')(session)
// configuration ===========================================
    
// config files
var db = require('./config/db');
var index = require('./config/index');

// set our port
var port = process.env.PORT || 8080; 

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)

 mongoose.connect(db.url); 

 app.use(session({  
  store: new RedisStore({
    url: index.url
  }),
  secret: index.secret,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());  
app.use(passport.session());  


// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// routes ==================================================
require('./app/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('App running on Port ' + port);

// expose app           
exports = module.exports = app;        