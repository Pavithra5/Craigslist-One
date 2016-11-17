// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema
var subcategorySchema = new Schema({
	_id:Number,
	category_id:Number,
	name:String
	

});


//create a model usiing the schema
var Subcategory = mongoose.model('subcategory', subcategorySchema);

//make this available to the users in the application
module.exports = Subcategory;
