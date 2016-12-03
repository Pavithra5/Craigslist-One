// app/models/classified.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema


var favoritesSchema = new Schema({
	_id:Schema.Types.ObjectId,
	classified_id:Schema.Types.ObjectId,
	user_id:Schema.Types.ObjectId	
});





//create a model usiing the schema
var Favorite = mongoose.model('favorites', favoritesSchema,'favorites');

//make this available to the users in the application
module.exports = Favorite;
