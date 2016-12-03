// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema


var sizeSchema = new Schema({
	_id:Schema.Types.ObjectId,
	size:String
	
});





//create a model usiing the schema
var Size = mongoose.model('size', sizeSchema,'size');

//make this available to the users in the application
module.exports = Size;
