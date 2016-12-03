// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema


var housingSchema = new Schema({
	_id:Schema.Types.ObjectId,
	type:String
});





//create a model usiing the schema
var Housing = mongoose.model('housingtype', housingSchema,'housingtype');

//make this available to the users in the application
module.exports = Housing;
