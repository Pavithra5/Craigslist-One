//var Classified = require('./models/classified');
var Category=require('./models/category');
var Subcategory=require('./models/subcategory');
var Classified = require('./models/classified');
var FuelType = require('./models/fueltype');
var Condition = require('./models/condition');
var Cylinder = require('./models/cylinder');
var DriveType = require('./models/drivetype');
var Password = require('./models/password');
var Role = require('./models/role');
var User = require('./models/user');


    
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
                    
                    res.json(result);
               });

            //Version 2
       /* Category.find({})
                .populate({
                    path:'subcats',
                    model:'subcategory'})
                .exec(function(err,result){
                    console.log(result);
                );*/

           });



        //To save a new post
        app.get('/api/classified/save', function(req, res){

            var newpost=new Classified({
                _id:null,
                userid:"582dd2973153725a276269c4",
                catid:"582dd2973153725a276269c4",
                subcatid:"582dd2973153725a276269c4",
                pdate:'11/29/2016',
                udate:'11/29/2016',
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
                
            });


            
        });


        //To display an existing post
        app.get('/api/classified/show', function(req, res){
                     

var cats=Classified.aggregate([
            {
                $lookup:
                {
                    from: "subcategory",
                    localField: "_id",
                    foreignField: "subcatid",
                    as: "subcategories"
                }
            }


                ]).exec(function(err,result){

                    });
                    
                    cats.find({Desc:"Post for housing/apts"}
                        ,function(err,ress){
                if(err) throw err;
                res.json(ress);
                   

            });
               


                     });

        app.get('/api/classified/new', function(req, res){
            res.json(new Classified());
        });


        //To get the fuel types
        app.get('/api/classified/fueltype', function(req, res){
            FuelType.find({},function(err,fueltypes){
                if (err) throw err;
                res.json(fueltypes);
            });
        });

        //To get the item conditions
        app.get('/api/classified/condition', function(req, res){
            Condition.find({},function(err,conditions){
                if (err) throw err;
                res.json(conditions);
            });
        });


        //To get the cylinders
        app.get('/api/classified/cylinder', function(req, res){
            Cylinder.find({},function(err,cylinders){
                if (err) throw err;
                res.json(cylinders);
            });
        });

        //To get the drive types
        app.get('/api/classified/drivetype', function(req, res){
            DriveType.find({},function(err,drivetypes){
                if (err) throw err;
                res.json(drivetypes);
            });
        });

        //To get the posts(modify later)
        app.get('/api/classified/', function(req, res){
            Classified.find({},function(err,posts){
                if (err) throw err;
                res.json(posts);
            });
        });


        //To get the password
        app.get('/api/classified/login', function(req, res){
            Password.find({userid:"5835074d2e415690e60becc1"},function(err,password){
                if (err) throw err;
                res.json(password);
            });
        });

        //To get the user
        app.get('/api/classified/user', function(req, res){
            User.find({_id:"5835074d2e415690e60becc1"},function(err,user){
                if (err) throw err;
                res.json(user);
            });
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
