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
	price:Number,
	location:String,
	area:Number,
	bed:Number,
	bath:Number,
	amenities:String,
	image:String,
	dlength:Number,
	dwidth:Number,
	dheight:Number,
	conditionid:Schema.Types.ObjectId,
	make:String,
	model:String,
	year:Number,
	transmissionid:Schema.Types.ObjectId,
	fueltype:Schema.Types.ObjectId,
	odometer:Number,
	dateavailable:String,
	furnished:Number,
	isactive:Number,
	housetype:Schema.Types.ObjectId,
	laundry:Number,
	parking:Number,
	cylinders:Schema.Types.ObjectId,
	drivetype:Schema.Types.ObjectId,
	paintcolor:Schema.Types.ObjectId,
	titlestatus:Schema.Types.ObjectId,
	vehicletype:Schema.Types.ObjectId,
	employmenttype:Schema.Types.ObjectId,
	dealer:Number,
	privateroom:Number,
	privatebath:Number,
	sizeid:Schema.Types.ObjectId,
	propulsionid:Schema.Types.ObjectId,
	zip:Number
});





//create a model usiing the schema
var Classified = mongoose.model('classified', classifiedSchema,'classified');

//make this available to the users in the application
module.exports = Classified;
