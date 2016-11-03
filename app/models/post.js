// app/models/post.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema=mongoose.Schema;

//create a schema
var postSchema=new Schema({
	name:String
})


//create a model usiing the schema
var Post=mongoose.model('craiglisttable',postSchema);

//make this available to the users in the application
module.exports=Post;
