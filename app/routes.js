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
var passport = require('passport');


    
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
                dheight:false,
                year: true

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

        var year={
            "year":[1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,
                    2011,2012,2013,2014,2015,2016]
        };
        //To get the fields for categories
         app.get('/api/categoryFields', function(req, res){
            res.json(categoryFields);
         });

         //To get the fields for subcategories
         app.get('/api/subcategoryFields', function(req, res){
            res.json(subcategoryFields);
         });

         //To get the year dropdown
         app.get('/api/year', function(req, res){
            res.json(year);
         });



        //Get user function
            function getUser(emailID) {
                return User.find({email: emailID,isactive:1}).exec();
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



        //To save a new classified/update existing classified
        app.get('/api/classified/save', function(req, res){
            var classifiedJSON=JSON.parse(req.query.user);
            classifiedJSON.catid=new mongoose.Types.ObjectId(classifiedJSON.catid);
            classifiedJSON.subcatid=new mongoose.Types.ObjectId(classifiedJSON.subcatid);
            console.log("ZIP "+classifiedJSON.zip)

            if(classifiedJSON.conditionid!==undefined)
                classifiedJSON.conditionid=new mongoose.Types.ObjectId(classifiedJSON.conditionid);

            if(classifiedJSON.transmissionid!==undefined)
                classifiedJSON.transmissionid=new mongoose.Types.ObjectId(classifiedJSON.transmissionid);

            if(classifiedJSON.fueltype!==undefined)
                classifiedJSON.fueltype=new mongoose.Types.ObjectId(classifiedJSON.fueltype);

            if(classifiedJSON.housetype!==undefined)
                classifiedJSON.housetype=new mongoose.Types.ObjectId(classifiedJSON.housetype);

            if(classifiedJSON.cylinders!==undefined)
                classifiedJSON.cylinders=new mongoose.Types.ObjectId(classifiedJSON.cylinders);

            if(classifiedJSON.drivetype!==undefined)
                classifiedJSON.drivetype=new mongoose.Types.ObjectId(classifiedJSON.drivetype);

            if(classifiedJSON.paintcolor!==undefined)
                classifiedJSON.paintcolor=new mongoose.Types.ObjectId(classifiedJSON.paintcolor);

            if(classifiedJSON.titlestatus!==undefined)
                classifiedJSON.titlestatus=new mongoose.Types.ObjectId(classifiedJSON.titlestatus);

            if(classifiedJSON.vehicletype!==undefined)
                classifiedJSON.vehicletype=new mongoose.Types.ObjectId(classifiedJSON.vehicletype);

            if(classifiedJSON.employmenttype!==undefined)
                classifiedJSON.employmenttype=new mongoose.Types.ObjectId(classifiedJSON.employmenttype);

            if(classifiedJSON.sizeid!==undefined)
                classifiedJSON.sizeid=new mongoose.Types.ObjectId(classifiedJSON.sizeid);

            if(classifiedJSON.propulsionid!==undefined)
                classifiedJSON.propulsionid=new mongoose.Types.ObjectId(classifiedJSON.propulsionid);

               
                if(classifiedJSON._id==undefined)
                {
                    classifiedJSON._id=new mongoose.Types.ObjectId(classifiedJSON._id);
                    var newpost=new Classified(classifiedJSON);  
                    newpost.save(function (err, newpost) {
                    if (err) return console.error(err);
                    res.json(newpost);
                });     
                }
            
            else
            {   
                
                
                Classified.findOneAndUpdate({_id:new mongoose.Types.ObjectId(classifiedJSON._id)},classifiedJSON,function(err,result){
                    if(err) console.log(err);
                    res.json(result);

                });
            }
           


            
        });


        //To display an existing classified
        app.get('/api/classified/show', function(req, res){
        var filter={};
        filter.isactive=1;
        if(req.query.classified_id){
            filter._id= new mongoose.Types.ObjectId(req.query.classified_id);
        }
        if(req.query.user_id){
            filter.userid= new mongoose.Types.ObjectId(req.query.user_id);
        }
        
        if(req.query.category_id) {
            filter.catid = new mongoose.Types.ObjectId(req.query.category_id);
        } 
        if(req.query.subcategory_id) {
            filter.subcatid = new mongoose.Types.ObjectId(req.query.subcategory_id);
        }
        if(req.query.post_date) {
            filter.pdate = req.query.post_date;
        }
        if(req.query.update_date) {
            filter.udate = req.query.update_date;
        }
        if(req.query.employmenttype){
            filter.employmenttype=new mongoose.Types.ObjectId(req.query.employmenttype);
        }
        
        if(req.query.conditionid){
            filter.conditionid=new mongoose.Types.ObjectId(req.query.conditionid);
        }
        if(req.query.dateavailable){
            filter.dateavailable=req.query.dateavailable;
        }
        if(req.query.bed){
            filter.bed=parseInt(req.query.bed);
        }
        if(req.query.bath){
            filter.bath=parseInt(req.query.bath);
        }
        if(req.query.housetype){
            filter.housetype=new mongoose.Types.ObjectId(req.query.housetype);
        }
        if(req.query.laundry){
            filter.laundry=parseInt(req.query.laundry);
        }
        if(req.query.parking){
            filter.parking=parseInt(req.query.parking);
        }
        if(req.query.furnished){
            filter.furnished=parseInt(req.query.furnished);
        }
        if(req.query.privateroom){
            filter.privateroom=parseInt(req.query.privateroom);
        }
        if(req.query.privatebath){
            filter.privatebath=parseInt(req.query.privatebath);
        }
        if(req.query.colors){
            filter.paintcolor=new mongoose.Types.ObjectId(req.query.colors);
        }
        if(req.query.propulsion){
            filter.propulsionid=new mongoose.Types.ObjectId(req.query.propulsion);
        }
        if(req.query.cylinder){
            filter.cylinders=new mongoose.Types.ObjectId(req.query.cylinder);
        }
        if(req.query.drivetype){
            filter.drivetype=new mongoose.Types.ObjectId(req.query.drivetype);
        }
        if(req.query.fueltype){
            filter.fueltype=new mongoose.Types.ObjectId(req.query.fueltype);
        }
        if(req.query.size){
            filter.sizeid=new mongoose.Types.ObjectId(req.query.size);
        }
        if(req.query.titlestatus){
            filter.titlestatus=new mongoose.Types.ObjectId(req.query.titlestatus);
        }
        if(req.query.transmission){
            filter.transmissionid=new mongoose.Types.ObjectId(req.query.transmission);
        }
        if(req.query.vehicletype){
            filter.vehicletype=new mongoose.Types.ObjectId(req.query.vehicletype);
        }
        if(req.query.make){
            filter.make=req.query.make;
        }
        if(req.query.model){
            filter.model=req.query.model;
        }
        if(req.query.dealer){
            filter.dealer=parseInt(req.query.dealer);
        }
        if(req.query.area1){
            filter.area= { $gt: parseInt(req.query.area1), $lt: parseInt(req.query.area2) }; 
        }
        if(req.query.price1){
            filter.price= { $gt: parseInt(req.query.price1), $lt: parseInt(req.query.price2) };
        }
        if(req.query.width1){
            filter.dwidth= { $gt: parseInt(req.query.width1), $lt: parseInt(req.query.width2) }; 
        }
        if(req.query.height1){
            filter.dheight= { $gt: parseInt(req.query.height1), $lt: parseInt(req.query.height2) }; 
        }
        if(req.query.length1){
            filter.dlength= { $gt: parseInt(req.query.length1), $lt: parseInt(req.query.length2) }; 
        }
        if(req.query.year1){
            filter.year= { $gt: parseInt(req.query.year1), $lt: parseInt(req.query.year2) }; 
        }
        if(req.query.odometer1){
            filter.odometer= { $gt: parseInt(req.query.odometer1), $lt: parseInt(req.query.odometer2) }; 
        }
       
        if(req.query.search){
            filter.$or= [
                        {desc:{$regex :new RegExp(".*"+req.query.search+".*","i")}},
                        {shortdesc:{$regex :new RegExp(".*"+req.query.search+".*","i")}}

                            
                      ];
        }
        var skip=2;
        var limit=2;
        Classified.aggregate([
            
            { 
                $match:
               
                    filter
          
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

            }/*,
            {$sort: {shortdesc: 1}},
            {$skip:(req.query.page-1)*2},
            {$limit: 2},*/
            


                ]).exec(function(err,result){
                    res.json(result);
                    });
                    
                    
               


                     });


    //To display a new classified form
        app.get('/api/classified/new', function(req, res){
            res.json(new Classified());
        });

    


     //To delete an existing classified
        app.get('/api/classified/delete',function(req,res){
                Classified.findOneAndUpdate({_id:req.query.id},{isactive : 0},function(err,update){
                                                
                                               
                if(err) throw err;
                
                   console.log("Updated");
                   res.json(update);

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
            

            var query=Favorite.aggregate([
            {
                $lookup:
                {   

                    from: "classified",
                    localField: "userid",
                    foreignField: "user_id",
                    as: "user"
                }

            },
            {
                $lookup:
                {
                    from:"classified",
                    localField:"_id",
                    foreignField:"classified_id",
                    as:"classified"
                }
            }


                ]);




           query.exec(function(err,result){
                    
                    res.json(result);
               });



        });

        //To create a favorite
        app.get('/api/classified/favorite/create', function(req, res){

            var newfav=new Favorite({
                _id:null,
                classified_id:req.params.cid,
                user_id:req.params.uid,
                isactive:1

            })
            newfav.save(function(err,result){
                if(err)console.log(err);
                console.log("Favorite added");
            })


        });

        
        //To delete a favorite
        app.get('/api/favorite/delete', function(req, res){

            Favorite.findOneAndUpdate({_id:req.params.id},{isactive:0},function(err,result){
                if(err)console.log(err)
                    else
                    console.log("Deleted favorite");
            })
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
            Password.find({userid:req.params.uid},function(err,password){
                if (err) throw err;
                res.json(password);
            });
        });

    //To update the password
        app.get('/api/user/password/update', function(req, res){
            Password.findOneAndUpdate({userid:req.params.uid},{password:req.params.pwd},function(err,password){
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
            User.find({_id:req.params.uid},function(err,user){
                if (err) throw err;
                res.json(user);
            });
        });

    //To get all users
        app.get('/api/users', function(req, res){
            User.find({isactive:1},function(err,users){
                if (err) throw err;
                res.json(users);
            });
        });




    //To update the user details
        app.get('/api/user/edit', function(req, res){
            var updateUser={};
            if(req.params.name)
            {
                updateUser.name=req.params.name;
            }
            if(req.params.email)
            {
                updateUser.email=req.params.email;
            }
            if(req.params.address)
            {
                updateUser.address=req.params.address;
            }
            if(req.params.city)
            {
                updateUser.city=req.params.city;
            }
            if(req.params.sid)
            {
                updateUser.state_id=new mongoose.Types.ObjectId(req.params.sid);
            }
            if(req.params.zip)
            {
                updateUser.zip=parseInt(req.params.zip);
            }
            if(req.params.ctime)
            {
                updateUser.contacttime=req.params.ctime;
            }
            User.findOneAndUpdate({_id:req.params.uid},updateUser,function(err,user){
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

    //To get a single user object
        app.get('/api/user',function(req,res){
           
            User.find({_id:req.query.id},function(err,resp){
                res.json(resp);
            })


        });
    //To save user details
        app.get('/api/user/create',function(req,res){
            var userJson = JSON.parse(req.query.user);
            
            userJson.state_id = new mongoose.Types.ObjectId(userJson.state_id);

            var newuser=new User(userJson);     
            
            newuser.save(function (err, newuser) {
                if (err) return console.error(err);
                console.log("User Saved");

                var userPromise = getUser(userJson.email);
                userPromise.then(function(user){
                   
                    var newpassword=new Password({
                        _id: null,
                        userid: user[0]._id,
                        password: req.query.password
                    }); 

                    newpassword.save(function (err, newuser) {
                        if (err) return console.error(err);
                        console.log("Password Saved");
                        res.json({msg:"User data Saved!"});
                    });

                });  
            });              

        });

           
        

    //To match username and password
        app.get('/api/check', function(req, res){

            function getPass(userid,pass) {
                return Password.find({"userid":userid}).exec();
            }

            var userPromise = getUser(req.query.email);
            userPromise.then(function(user){
                var result = {
                        err:"user not found"
                    };
                if(user.length > 0) {
                   
                    var passPromise = Password.find({userid: user[0]._id,password:req.query.password}).exec();
                    passPromise.then(function(pass){
                     
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
        

       

         // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });
    };
