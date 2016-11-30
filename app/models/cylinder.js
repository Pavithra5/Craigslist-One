// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema


var cylinderSchema = new Schema({
	_id:Number,
	condition:Number
	

});





//create a model usiing the schema
var Cylinder = mongoose.model('cylinders', cylinderSchema,'cylinders');

//make this available to the users in the application
module.exports = Cylinder;
