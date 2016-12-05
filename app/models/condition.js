// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema


var conditionSchema = new Schema({
	_id:Schema.Types.ObjectId,
	condition:String
	

});





//create a model usiing the schema
var Condition = mongoose.model('condition', conditionSchema,'condition');

//make this available to the users in the application
module.exports = Condition;
