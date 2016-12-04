var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Category=require('./models/category');
var Classified = require('./models/classified');
var Colors = require('./models/color');
var Condition = require('./models/condition');
var Cylinder = require('./models/cylinder');
var DriveType = require('./models/drivetype');
var Employment = require('./models/employment');
var Favorite = require('./models/favorite');
var FuelType = require('./models/fueltype');
var Housing = require('./models/housing');
var Password = require('./models/password');
var Propulsion = require('./models/propulsion');
var Role = require('./models/role');
var State = require('./models/state');
var Size = require('./models/size');
var Subcategory=require('./models/subcategory');
var Titlestatus=require('./models/titlestatus');
var Transmission=require('./models/transmission');
var User = require('./models/user');
var Vehicletype=require('./models/vehicletype');


    
    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes


        var categoryFields={

            "582dd2dc3153725a276269c7":{
                compensation:true,
                employmenttype:true
            },
            "582dd2dc3153725a276269c6":{

            },
            "582dd2dc3153725a276269c5":{            
                price:true,
                dlength:true,
                dwidth:true,
                dheight:true,
                manufacturer:true,
                condition:true
            },
            "582dd2973153725a276269c4":{
                area:true,
                price:true,
                dateavailable:true,
                bed:true,
                bath:true,
                housetype:true,
                laundry:true,
                parking:true,
                furnished:true
            }

        };

        var subcategoryFields={
            "583e1bec2f99e03593d8cb38":{
                bed:false,
                bath:false,
                furnished:false,
                housetype:false,
                laundry:false,
                parking:false

            },
            "583e1bec2f99e03593d8cb39":{
                bed:false,
                bath:false,
                furnished:false,
                housetype:false,
                laundry:false,
                parking:false

            },
            "583e1bec2f99e03593d8cb3d":{
                privateroom:true,
                privatebath:true,
                bed:false,
                bath:false,
                housetype:false
            },
            "583e1bec2f99e03593d8cb3e":{
                privateroom:true,
                privatebath:true,
                bed:false,
                bath:false,
                housetype:false
            },
            "583e1b582f99e03593d8cb32":{
                year:true,
                colors:true
            },
            "583e1b582f99e03593d8cb17":{
                propulsion:true,
                
            },
            "583e1b582f99e03593d8cb1a":{
                cylinder:true,
                drivetype:true,
                fueltype:true,
                colors:true,
                size:true,
                titlestatus:true,
                transmission:true,
                vehicletype:true,
                odometer:true,
                manufacturer:false,
                make:true,
                model:true,
                dlength:false,
                dwidth:false,
                dheight:false

            },
            "583e1b582f99e03593d8cb2a":{
                dlength:false,
                dwidth:false,
                dheight:false,
                make:true,
                manufacturer:false,
                model:true,
                fueltype:true,
                colors:true,
                titlestatus:true,
                transmission:true,
                odometer:true
            },
            "583e1b582f99e03593d8cb2d":{
                cylinder:true,
                drivetype:true,
                fueltype:true,
                colors:true,
                titlestatus:true,
                transmission:true,
                vehicletype:true,
                odometer:true,
                manufacturer:false,
                make:true,
                model:true,
                dlength:false,
                dwidth:false,
                dheight:false
            }


        };


        //To get the fields for categories
         app.get('/api/categoryFields', function(req, res){
            res.json(categoryFields);
         });

         //To get the fields for subcategories
         app.get('/api/subcategoryFields', function(req, res){
            res.json(subcategoryFields);
         });



        //Get user function
            function getUser(emailID) {
                return User.find({email: emailID}).exec();
            }


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



        //To save a new classified
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


    //To display a new classified form
        app.get('/api/classified/new', function(req, res){
            res.json(new Classified());
        });

    //To update an existing classified
        app.get('/api/classified/update',function(req,res){
                Classified.findOneAndUpdate({_id:"5841fa7fd237416c062f5d5c"},{
                                              userid : "5835074d2e415690e60becc1",
                                                catid : "582dd2dc3153725a276269c5",
                                                subcatid : "583e1b582f99e03593d8cb0e",
                                                pdate : "12/1/2016",
                                                udate : "12/1/2016",
                                                shortdesc : "For Sale/Antiques",
                                                desc : "For Sale/Antiques changed using update",
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
                                                conditionid : "5840fc35ba57cccf17f3fa4b",
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
                                                propulsionid : null},function(err,update){
                if(err) throw err;
                
                   console.log("Updated");

            });
           
          });



     //To delete an existing classified
        app.get('/api/classified/delete',function(req,res){
                Classified.findOneAndUpdate({_id:"5841fa7fd237416c062f5d5c"},{isactive : 0},function(err,update){
                                                
                                               
                if(err) throw err;
                
                   console.log("Updated");

            });
           
          });

    //To get the colors
        app.get('/api/classified/colors', function(req, res){
            Colors.find({},function(err,col){
                if (err) throw err;
                res.json(col);
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

    //To get the employment types
        app.get('/api/classified/employmenttype', function(req, res){
            Employment.find({},function(err,employmenttype){
                if (err) throw err;
                res.json(employmenttype);
            });
        });

    //To get the favorites
        app.get('/api/classified/favorite', function(req, res){
            Favorite.find({},function(err,favorites){
                if (err) throw err;
                res.json(favorites);
            });
        });

    //To get the fuel types
        app.get('/api/classified/fueltype', function(req, res){
            FuelType.find({},function(err,fueltypes){
                if (err) throw err;
                res.json(fueltypes);
            });
        });

    //To get the house types
        app.get('/api/classified/housetype', function(req, res){
            Housing.find({},function(err,housetype){
                if (err) throw err;
                res.json(housetype);
            });
        });

    //To get the password
        app.get('/api/user/login', function(req, res){
            Password.find({userid:"5835074d2e415690e60becc1"},function(err,password){
                if (err) throw err;
                res.json(password);
            });
        });

    //To update the password
        app.get('/api/user/password/update', function(req, res){
            Password.findOneAndUpdate({userid:"5835074d2e415690e60becc1"},{password:"newpassword"},function(err,password){
                if (err) throw err;
                console.log("Password updated");
            });
        });

    //To get the propulsion
        app.get('/api/classified/propulsion', function(req, res){
            Propulsion.find({},function(err,propul){
                if (err) throw err;
                res.json(propul);
            });
        });
        
    //To get the size(car)
        app.get('/api/classified/size', function(req, res){
            Size.find({},function(err,sizes){
                if (err) throw err;
                res.json(sizes);
            });
        });

    //To get the states
        app.get('/api/classified/state', function(req, res){
            State.find({},function(err,states){
                if (err) throw err;
                res.json(states);
            });
        });

    //To get the title status
        app.get('/api/classified/titlestatus', function(req, res){
            Titlestatus.find({},function(err,status){
                if (err) throw err;
                res.json(status);
            });
        });


    //To get the transmission
        app.get('/api/classified/transmission', function(req, res){
            Transmission.find({},function(err,trans){
                if (err) throw err;
                res.json(trans);
            });
        });

    //To get the vehicletype
        app.get('/api/classified/vehicletype', function(req, res){
            Vehicletype.find({},function(err,vehicle){
                if (err) throw err;
                res.json(vehicle);
            });
        });
        

        //To get the individual classifieds(modify later)
        app.get('/api/classified/', function(req, res){
            Classified.find({},function(err,posts){
                if (err) throw err;
                res.json(posts);
            });
        });


        

    //To get the user
        app.get('/api/classified/user', function(req, res){
            User.find({_id:"5835074d2e415690e60becc1"},function(err,user){
                if (err) throw err;
                res.json(user);
            });
        });


    //To update the user details
        app.get('/api/user/edit', function(req, res){
            User.findOneAndUpdate({_id:"5835074d2e415690e60becc1"},{name:"Robert Downey Jr"},function(err,user){
                if (err) throw err;
                console.log("User updated");
            });
        });

    //To delete the user details
        app.get('/api/user/delete', function(req, res){
            User.findOneAndUpdate({_id:"5835074d2e415690e60becc1"},{isactive:0},function(err,user){
                if (err) throw err;
                console.log("User deleted");
            });
        });


    //To save user details
        app.get('/api/user/create',function(req,res){
                var newuser=new User({
                    
                    _id : null,
                    name:"New user",
                    phone:"9894044059",
                    email:"email@email.com",
                    address:"Address",
                    city:"Dallas",
                    state_id:20,
                    zip:75252,
                    contacttime:"Morning",
                    roleid:2,
                    isactive:1
                    
                
            });     

           newuser.save(function (err, newuser) {
                if (err) return console.error(err);
                console.log("User Saved")
            });



           var userPromise = getUser("email@email.com");
            userPromise.then(function(user){
                var result = {
                        err:"user not found"
                    };

var newpassword=new Password({
                    _id:null,
                    userid:user[0]._id,
                    password:"password"
            }); 

            newpassword.save(function (err, newuser) {
                if (err) return console.error(err);
                console.log("Password Saved")
            });



            });



                

        });

           
        

    //To match username and password
        app.get('/api/check', function(req, res){

            

            function getPass(userid,pass) {
                return Password.find({"userid":userid}).exec();
            }

            var userPromise = getUser(req.params.email);
            userPromise.then(function(user){
                var result = {
                        err:"user not found"
                    };
                if(user.length > 0) {
                    console.log(user);
                    var passPromise = Password.find({userid: user[0]._id,password:req.params.password}).exec();
                    passPromise.then(function(pass){
                        console.log(pass);
                        if(pass.length > 0) {
                            res.json(user);
                        }
                        else {

                            res.json({err: "pass not found"});

                        }
                    });
                } else {
                    res.json(result);
                }
            });
        });
        


        /*app.get('/api/classified/:id', function(req, res){
           

            Classified.findById(req.params.id,function(error,classified) {
                res.json(classified);  
                
            });
        });*/



       // app.get('/showone', function(req, res){
        app.get('/api/classified/:id', function(req, res){
        
        Classified.aggregate([
            
            { 
                $match:
                { 
                    _id:new mongoose.Types.ObjectId(req.params.id)

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



        app.get('/showall', function(req, res){
        
        Classified.aggregate([
            
            { 
                $match:
                { 
                    userid:new mongoose.Types.ObjectId("5835074d2e415690e60becc1")

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
