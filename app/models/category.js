// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema
var categorySchema = new Schema({
	_id:Number,
	name:String,
	_id:[{ type: Number, ref: 'subcategory' }],
	category_id:[{ type: Number, ref: 'subcategory' }],
	name:[{ type: String, ref: 'subcategory' }]

});


//create a model usiing the schema
var Category = mongoose.model('category', categorySchema,'category');

//make this available to the users in the application
module.exports = Category;
