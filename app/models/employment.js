// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema


var employmentSchema = new Schema({
	_id:Schema.Types.ObjectId,
	name:String,
	
	
});





//create a model usiing the schema
var Employment = mongoose.model('employmenttype', employmentSchema,'employmenttype');

//make this available to the users in the application
module.exports = Employment;
