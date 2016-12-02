var mongoose = require('mongoose');
var Schema = mongoose.Schema;
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
             
           var query=Category.aggregate([
            {
                $lookup:
                {   

                    from: "subcategory",
                    localField: "_id",
                    foreignField: "category_id",
                    as: "subcategories"
                }
            }


                ]);




           query.exec(function(err,result){
                    
                    res.json(result);
               });

          
           
           });



        //To save a new post
        app.get('/api/classified/save', function(req, res){

            var newpost=new Classified({
                    
                    _id : null,
                    userid : "5835074d2e415690e60becc1",
                    catid : "582dd2dc3153725a276269c5",
                    subcatid : "583e1b582f99e03593d8cb0e",
                    pdate : "12/1/2016",
                    udate : "12/1/2016",
                    shortdesc : "For Sale/Antiques",
                    desc : "For Sale/Antiques",
                    price : 1200,
                    location : "Dallas",
                    area : 0,
                    bed : 0,
                    bath : 0,
                    amenities : "",
                    image : "",
                    dlength : 12,
                    dwidth : 34,
                    dheight : 45,
                    conditionid : "5840fbedba57cccf17f3fa4a",
                    make : "",
                    model : "",
                    year : 1556,
                    transmissionid : null,
                    fueltype : null,
                    odometer: 0,
                    dateavailable : "12/1/2016",
                    furnished : 0,
                    isactive : 1,
                    housetype : null,
                    laundry : 0,
                    parking : 0,
                    cylinders : null,
                    drivetype : null,
                    paintcolor : null,
                    titlestatus : null,
                    vehicletype : null,
                    employmenttype : null,
                    dealer : 0,
                    privateroom : 0,
                    privatebath : 0,
                    sizeid : null,
                    propulsionid : null
                
            });     

           newpost.save(function (err, newpost) {
                if (err) return console.error(err);
                console.log("Saved")
            });


            
        });


        //To display an existing post
        app.get('/api/classified/show', function(req, res){
        
        Classified.aggregate([
            
            { 
                $match:
                { 
                    catid:new mongoose.Types.ObjectId(req.query.category_id),
                    subcatid:new mongoose.Types.ObjectId(req.query.subcategory_id)

                }   

            },
            {
                $lookup:
                {
                    from: "users",
                    localField: "userid",
                    foreignField: "_id",
                    as: "user",
                    
                    
                }
               
            },
            {
                 $lookup:
                {
                    from: "category",
                    localField: "catid",
                    foreignField: "_id",
                    as: "categ",
                    
                    
                }

            },
            {
                 $lookup:
                {
                    from: "subcategory",
                    localField: "subcatid",
                    foreignField: "_id",
                    as: "subcateg",
                    
                    
                }

            },
            {
                 $lookup:
                {
                    from: "condition",
                    localField: "conditionid",
                    foreignField: "_id",
                    as: "condition",
                    
                    
                }

            },
            {
                 $lookup:
                {
                    from: "transmission",
                    localField: "transmissionid",
                    foreignField: "_id",
                    as: "transmission",
                    
                    
                }

            },
            {
                 $lookup:
                {
                    from: "fueltype",
                    localField: "fueltype",
                    foreignField: "_id",
                    as: "fuel",
                    
                    
                }

            },
            {
                 $lookup:
                {
                    from: "housingtype",
                    localField: "housetype",
                    foreignField: "_id",
                    as: "housetype",
                    
                    
                }

            },
            {
                 $lookup:
                {
                    from: "cylinders",
                    localField: "cylinders",
                    foreignField: "_id",
                    as: "cylinders",
                    
                    
                }

            },
            {
                 $lookup:
                {
                    from: "drivetype",
                    localField: "drivetype",
                    foreignField: "_id",
                    as: "drive",
                    
                    
                }

            },
            {
                 $lookup:
                {
                    from: "colors",
                    localField: "paintcolor",
                    foreignField: "_id",
                    as: "paint",
                    
                    
                }

            },
            {
                 $lookup:
                {
                    from: "titlestatus",
                    localField: "titlestatus",
                    foreignField: "_id",
                    as: "titlestatus",
                    
                    
                }

            },
            {
                 $lookup:
                {
                    from: "vehicletype",
                    localField: "vehicletype",
                    foreignField: "_id",
                    as: "vehicletype",
                    
                    
                }

            },
            {
                 $lookup:
                {
                    from: "employmenttype",
                    localField: "employmenttype",
                    foreignField: "_id",
                    as: "employmenttype",
                    
                    
                }

            },
            {
                 $lookup:
                {
                    from: "size",
                    localField: "sizeid",
                    foreignField: "_id",
                    as: "vehiclesize",
                    
                    
                }

            },
            {
                 $lookup:
                {
                    from: "propulsion",
                    localField: "propulsionid",
                    foreignField: "_id",
                    as: "propulsion",
                    
                    
                }

            }
            


                ]).exec(function(err,result){
                    res.json(result);
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
