// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema


var classifiedSchema = new Schema({
	_id:Schema.Types.ObjectId,
	userid:Schema.Types.ObjectId,
	catid:Schema.Types.ObjectId,
	subcatid:Schema.Types.ObjectId,
	pdate:String,
	udate:String,
	shortdesc:String,
	desc:String,
	price:String,
	location:String,
	area:String,
	bed:Number,
	bath:Number,
	amenities:String,
	image:String,
	dimensions:String,
	conditionid:Number,
	make:String,
	model:String,
	year:Number,
	transmission:Number,
	fueltype:Number,
	odometer:Number,
	dateavailable:String,
	furnished:Number,
	isactive:Number,
	housetype:String,
	laundry:Number,
	parking:Number,
	cylinders:Number,
	drivetype:Number,
	paintcolor:Number,
	vehiclesize:Number,
	titlestatus:Number,
	vehicletype:Number,
	employmenttype:Number
});





//create a model usiing the schema
var Classified = mongoose.model('posts', classifiedSchema,'posts');

//make this available to the users in the application
module.exports = Classified;
