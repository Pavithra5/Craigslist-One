// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema


var fueltypeSchema = new Schema({
	_id:Number,
	type:String
	

});





//create a model usiing the schema
var FuelType = mongoose.model('fueltype', fueltypeSchema,'fueltype');

//make this available to the users in the application
module.exports = FuelType;
