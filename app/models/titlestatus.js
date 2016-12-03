// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema


var titlestatusSchema = new Schema({
	_id:Schema.Types.ObjectId,
	status:String
	
});





//create a model usiing the schema
var Titlestatus = mongoose.model('titlestatus', titlestatusSchema,'titlestatus');

//make this available to the users in the application
module.exports = Titlestatus;
