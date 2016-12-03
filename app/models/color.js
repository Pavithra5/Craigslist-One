// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema


var colorSchema = new Schema({
	_id:Schema.Types.ObjectId,
	name:String,
	
	
});





//create a model usiing the schema
var Colors = mongoose.model('colors', colorSchema,'colors');

//make this available to the users in the application
module.exports = Colors;
