
// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema


var userSchema = new Schema({
	_id:Schema.Types.ObjectId,
	name:String,
	phone:String,
	email:String,
	address:String,
	city:String,
	state_id:Number,
	zip:Number,
	contacttime:String,
	roleid:Number,
	isactive:Number

});





//create a model usiing the schema
var User = mongoose.model('users', userSchema,'users');

//make this available to the users in the application
module.exports = User;
