
// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema


var roleSchema = new Schema({
	_id:Number,
	role:String
});





//create a model usiing the schema
var Role = mongoose.model('roles', roleSchema,'roles');

//make this available to the users in the application
module.exports = Role;
