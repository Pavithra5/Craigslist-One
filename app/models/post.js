// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema


var postSchema = new Schema({
	
	userid:Number,
	catid:Number,
	subcatid:Number,
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
var Post = mongoose.model('posts', postSchema,'posts');

//make this available to the users in the application
module.exports = Post;
