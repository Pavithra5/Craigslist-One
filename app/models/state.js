// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema


var stateSchema = new Schema({
	_id:Schema.Types.ObjectId,
	state:String
	
});





//create a model usiing the schema
var State = mongoose.model('states', stateSchema,'states');

//make this available to the users in the application
module.exports = State;
