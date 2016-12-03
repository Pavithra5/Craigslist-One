// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema


var transmissionSchema = new Schema({
	_id:Schema.Types.ObjectId,
	type:String,
	
	
});





//create a model usiing the schema
var Transmission = mongoose.model('transmission', transmissionSchema,'transmission');

//make this available to the users in the application
module.exports = Transmission;
