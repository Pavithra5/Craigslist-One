// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema


var categorySchema = new Schema({
	_id:Schema.Types.ObjectId,
	//name:String,
	//subcats: [{ type: Array, ref:'subcategory' }]
	//subcatid:[Number],
	//subcatname:[String],
	

});





//create a model usiing the schema
var Category = mongoose.model('category', categorySchema,'category');

//make this available to the users in the application
module.exports = Category;
