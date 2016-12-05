// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema


var passwordSchema = new Schema({
	//_id:Schema.Types.ObjectId,
	userid:Schema.Types.ObjectId,
	password:String
	

});





//create a model usiing the schema
var Password = mongoose.model('password', passwordSchema,'password');

//make this available to the users in the application
module.exports = Password;
