// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema


var drivetypeSchema = new Schema({
	_id:Number,
	type:String
	

});





//create a model usiing the schema
var DriveType = mongoose.model('drivetype', drivetypeSchema,'drivetype');

//make this available to the users in the application
module.exports = DriveType;
