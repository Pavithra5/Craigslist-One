
var Classified = require('./models/classified');
    
    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
       /* app.get('/api/posts', function(req, res) {
            var testPosts = {
                    "name": "Test1"
                };
            // use mongoose to get all posts in the database
            Post.find(function(err, posts) {

                if (err)
                    res.send(err);
                
                res.json(posts); // return all posts in JSON format
            });

            res.json(testPosts);
        });*/

        app.get('/api/classified/new', function(req, res){
            res.json(new Classified());
        });

        app.get('/api/classified/:id', function(req, res){
           /* var testClassified = {
                'id':'234234234',
                'shortDesc':'2006 CADILLAC STS SEADAN 3.6 - $4999 (SEAGOVILLE)',
                'postedDate': '11/1/2016', 
                'updatedDate':'11/4/2016', 
                'make':'Dodge', 
                'model':'Ram 1500', 
                'year':'2002', 
                'transmission':'Automatic', 
                'fuelType':'Deisel', 
                'odometer': '123000', 
                'price':'4999', 
                'description': '2006 CADILLAC STS 4DR. SEDAN,3.6,AUTO,COLD A/C,LEATHER SEATS,HEATED SEATS.,POWER W/L/M/S,POWER SUNROOF,BUCKET SEATS,WOOD GRAIN TRIM,TILT/CRUISE,TINTED GLASS,CHROME WHEELS,NEW TIRES,REAR SPOILER,RUNS AND DRIVES GREAT,SUPER CLEAN', 
                'condition':'CLEAN', 
                'image': 'https://images.craigslist.org/01313_jhBOzKb0rQ7_600x450.jpg' 
            };*/

            Classified.findById("234234234",function(error,post) {
                console.log(post);
                res.json(post);  
                
            });           

            
        });


        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

        app.get('/classified/:id', function(req, res) {
            res.sendfile('./public/views/classified.html'); // load our posts html file
        });      


    };

