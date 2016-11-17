// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema
var classifiedSchema = new Schema({
	_id:Number,
	
	name:String
});


//create a model usiing the schema
var Classified = mongoose.model('category', classifiedSchema);

//make this available to the users in the application
module.exports = Classified;
