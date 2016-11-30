//var Classified = require('./models/classified');
var Category=require('./models/category');

var Subcategory=require('./models/subcategory');
var Classified = require('./models/classified');
var Post = require('./models/post');
    
    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes



        //To display the categories on home page
        app.get('/api/categories', function(req, res){
             
            var cats=Category.aggregate([
            {
                $lookup:
                {
                    from: "subcategory",
                    localField: "_id",
                    foreignField: "category_id",
                    as: "subcategories"
                }
            }


                ]).exec(function(err,result){
                    console.log(result);
                    res.json(result);
               });




            //Version 1
            /*var query = Category.find({});
            /*Category.find({}, function(err, users) {
                if (err) throw err;
                console.log(users);
            });   
            query.exec(function (err, someValue) {
        if (err) return next(err);
        //res.json(someValue);
        console.log(someValue);
    });*/

            //Version 2
       /* Category.find({})
                .populate({
                    path:'subcats',
                    model:'subcategory'})
                .exec(function(err,result){
                    console.log(result);
                );*/

                //Version 3
           /* Category.find({ }, function(error, story) {
  if (error) {
    return handleError(error);
  }
  
  console.log(story); // prints "Aaron"
});*/

        });



        //To save a new post
        app.get('/api/classified/save', function(req, res){

            var newpost=new Post({
                
                userid:1,
                catid:1,
                subcatid:1,
                pdate:'11/23/2016',
                udate:'11/23/2016',
                shortdesc:'New post',
                desc:'New post description',
                price:'23',
                location:'Dallas',
                area:'',
                bed:0,
                bath:0,
                amenities:'Amenities',
                image:'',
                dimensions:'Dimensions',
                conditionid:0,
                make:'make',
                model:'model',
                year:1992,
                transmission:0,
                fueltype:0,
                odometer:0,
                dateavailable:'11/23/2016',
                furnished:0,
                isactive:0,
                housetype:'house type',
                laundry:0,
                parking:0,
                cylinders:0,
                drivetype:0,
                paintcolor:0,
                vehiclesize:0,
                titlestatus:0,
                vehicletype:0,
                employmenttype:0
            });     

           newpost.save(function (err, newpost) {
                if (err) return console.error(err);
                console.log("Post added");
            });


            
        });





        app.get('/api/classified/new', function(req, res){
            res.json(new Classified());
        });

        app.get('/api/classified/:id', function(req, res){
           

            Post.findById(req.params.id,function(error,post) {
                res.json(post);  
                
            });
        });

        app.get('/api/classifieds', function(req, res) {
            var testList = [{
                _id: '101',
                pDate: '11/1/2016',
                shortDesc: 'Short description goes here',
                location: 'location',
                image: 'https://images.craigslist.org/01313_jhBOzKb0rQ7_600x450.jpg',
                price: 5000
            }, 
            {
                _id: '102',
                pDate: '11/1/2016',
                shortDesc: 'Short description goes here',
                location: 'location',
                image: 'https://images.craigslist.org/01313_jhBOzKb0rQ7_600x450.jpg',
                price: 5000
            },
            {
                _id: '103',
                pDate: '11/1/2016',
                shortDesc: 'Short description goes here',
                location: 'location',
                image: 'https://images.craigslist.org/01313_jhBOzKb0rQ7_600x450.jpg',
                price: 5000
            },
            {
                _id: '104',
                pDate: '11/1/2016',
                shortDesc: 'Short description goes here',
                location: 'location',
                image: 'https://images.craigslist.org/01313_jhBOzKb0rQ7_600x450.jpg',
                price: 5000
            },
            {
                _id: '105',
                pDate: '11/1/2016',
                shortDesc: 'Short description goes here',
                location: 'location',
                image: 'https://images.craigslist.org/01313_jhBOzKb0rQ7_600x450.jpg',
                price: 5000
            }];
            
            res.json(testList);
        });


        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });
    };
