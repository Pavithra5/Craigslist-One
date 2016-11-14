// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema
var classifiedSchema = new Schema({
	_id:Number,
	shortDesc:String,
	postedDate:String,
	updatedDate:String,
	make:String,
	model:String,
	year:Number,
	transmission:String,
	fuelType:String,
	odometer:Number,
	price:Number,
	description:String,
	condition:String,
	image:String
});


//create a model usiing the schema
var Classified = mongoose.model('craiglisttables', classifiedSchema);

//make this available to the users in the application
module.exports = Classified;
