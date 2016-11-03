// grab the nerd model we just created
var Post = require('./models/post');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        app.get('/api/posts', function(req, res) {
            // use mongoose to get all posts in the database
            Post.find(function(err, posts) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(posts); // return all posts in JSON format
            });
        });

        // route to handle creating goes here (app.post)
        // route to handle editing goes here (app.put)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });


        //Direct to posts.html
        app.get('/posts', function(req, res) {
            res.sendfile('./public/views/posts.html'); // load our posts html file
        });

       


        //Create a new model and update the database
        app.post('/posts/names',(req,res)=>{
    
            var kai=new Post({
                name:req.body.name
            })      

            kai.save(function(err){
                if(err) throw err;

                console.log('Name added successfully');
                res.redirect('/posts')
            })

        });


        //To get the names from the database
        app.get('/',(req,res)=>{
            Post.find({},function(err,names){
                if(err)throw err;

            console.log(names);
            });
        });


        //To update the collection
        app.post('/update',(req,res)=>{
    
            
            Post.findOneAndUpdate({name:req.body.uname},{name:'Updated!'},function(err,nerd){
                if(err) throw err;
                console.log(nerd);
                   res.redirect('/posts')

            });
           
          });
              
        
        //To delete the user name
        app.post('/delete',(req,res)=>{
    
            Post.findOneAndRemove({ name: req.body.dname }, function(err) {
                if (err) throw err;

                  // we have deleted the user
                  console.log('User deleted!');
                  res.redirect('/posts')
            });
            }); 

        //To display contents of the collection on the page
        app.post('/display',(req,res)=>{
            Post.find({},function(err,names){
                if(err)throw err;

            res.json(names);
            });
        });




            
        


    };

