// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema


var vehicletypeSchema = new Schema({
	_id:Schema.Types.ObjectId,
	type:String,
	
	
});





//create a model usiing the schema
var Vehicletype = mongoose.model('vehicletype', vehicletypeSchema,'vehicletype');

//make this available to the users in the application
module.exports = Vehicletype;
