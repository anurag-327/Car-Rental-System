const express=require('express');
const app=express();
const path=require('path');
const cookieParser=require('cookie-parser');
const port=process.env.port|| 8000; 
const  ObjectID = require('mongodb').ObjectId;

app.use(cookieParser());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./build/views'));
app.use('/styles/',express.static(path.join(__dirname ,'./build/styles')));
app.use('/Images/',express.static(path.join(__dirname ,'./build/Images')));
app.use('/scripts/',express.static(path.join(__dirname ,'./build/scripts')));
app.use('/model/',express.static(path.join(__dirname ,'./model')));
app.use(express.urlencoded());
const logindetails= require('./model/login-details');
const cardetails= require('./model/car-details');
const bookingdetails= require('./model/booking_details');
const admin= require('./model/admin');


app.get('/',async function(req,res)
{
    const cars_list=await cardetails.find({})
    .sort({rate:-1});
    return res.render('home',{cars:cars_list,user:req.cookies.user_id});
    // return res.render('home',{cars:cars_list});
    
})

app.get('/home',async function(req,res)
{
    const cars_list=await cardetails.find({})
    .sort({rate:1});
    return res.render('home',{cars:cars_list,user:req.cookies.user_id});
})


app.get('/login',function(req,res)
{
    return res.render('login');
})
app.get('/signup',function(req,res)
{
    return res.render('signup');
})
app.get('/signout',function(req,res)
{
    res.clearCookie("user_id");
    return res.redirect("/");
})

app.post('/sign-up',function(req,res)
{
    console.log(req.body);
    if(req.body.password != req.body.confirmpassword)
    {
        console.log(req.body.password,req.body.confirmpassword);
        console.log("fail");
        return res.render('error',{error:"Unmatched Password",errorroute:"signup"});
    }
    else
    {
        logindetails.findOne({email:req.body.email},function(err,user)
        {
            if(!user)
            {
                const newuser=new logindetails({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password
                })
                newuser.save();
                return res.render('login');
            }
           else
            {
                console.log("fail");
                // return res.render('signup');
                return res.render('error',{error:"User Already Exists",errorroute:"signup"});

            }
        })
    }
    
})
app.post('/login-acc',async function(req,res)
{
    console.log(req.body);
    logindetails.findOne({email:req.body.email},function(err,user)
    {
        if(err)
        {
            console.log(err.message);
        }
        if(user)
        {
            if(user.password!=req.body.password)
            {
                console.log(req.body.password,user.password)
                console.log("Login fail");
                return res.render('error',{error:"Wrong Login Credential",errorroute:"login"});
            }
            else
            {
                console.log("pass");
                res.cookie('user_id',user._id);
                return res.redirect('/');
            }
        }
        else
        {
            return res.redirect("back");
        }
    })
   
    
})


app.get('/booking/:id',async function(req,res)
{
    if(req.cookies.user_id)
    {
// console.log(req.params);
    const car= await cardetails.findOne({_id:req.params.id});
    return res.render('booking',{car:car});
    }
    
})


app.post('/book',async function(req,res)
{
    // console.log(req.body);
    try{
        const newbooking= new bookingdetails(
            {
                firstname:req.body.firstname ,
                lastname:req.body.lastname ,
                email:req.body.email ,
                phoneno:req.body.phoneno ,
                passengercount:req.body.passengercount ,
                userstreetaddress:req.body.streetaddress ,
                usercity:req.body.city ,
                userregion:req.body.userregion ,
                userpincode:req.body.userpincode ,
                pickupstreetaddress:req.body.pickupstreetaddress ,
                pickupcity:req.body.pickupcity ,
                pickupregion:req.body.pickupregion ,
                pickuppincode:req.body.pickuppincode ,
                pickupdate:req.body.pickupdate ,
                destinationstreetaddress:req.body.destionationstreetaddress ,
                destinationcity:req.body.destinationcity ,
                destinationregion:req.body.destinationregion ,
                destinationpincode:req.body.destinationpincode ,
                dropoffdate:req.body.dropoffdate ,
                extranote:req.body.extranote,
                userid:req.cookies.user_id,
                carid:req.body.carcode
            }
        )
        // const newuser=new logindetails({
            
        //     phoneno:req.body.phoneno,
        //     userstreetaddress:req.body.streetaddress ,
        //     usercity:req.body.city ,
        //     userregion:req.body.userregion ,
        //     userpincode:req.body.userpincode ,
        // })
        // newuser.save();
        const result=await newbooking.save();
        console.log(result);
        return res.render('payment');
    }catch(err)
    {
        console.log(err.message);
    }
   
})

app.get('/contact',function(req,res)
{
    return res.render('contact');
})
app.get('/contact',function(req,res)
{
    return res.render('contact');
})
app.get('/payment',function(req,res)
{
    if(req.cookies.user_id)
    return res.render('payment');
})
app.get('/error',function(req,res)
{
    return res.render('error',{error:"Wrong Login Credential",errorroute:"/"});
})

app.get('/account',async function(req,res)
{
    const user=await logindetails.findOne({_id:req.cookies.user_id})
    const userbooking=await bookingdetails.find({userid:req.cookies.user_id})
    console.log(user,userbooking);
    return res.render('useraccount',{user:user,userbooking:userbooking}); 
})
app.get('/admin',async function(req,res)
{
    return res.render('loginadmin'); 
})

app.post('/loginadmin',function(req,res)
{
    console.log(req.body);
    admin.findOne({email:req.body.email},function(err,user)
    {
        if(err)
        {
            console.log(err.message);
        }
        if(user)
        {
            if(user.password!=req.body.password)
            {
                console.log(req.body.password,user.password)
                console.log("Login fail");
                return res.render('error',{error:"Wrong Login Credential",errorroute:"login"});
            }
            else
            {
                console.log("pass");
                res.cookie('admin_id',user._id);
                const fun=async function()
                {
                    const users=await logindetails.find({});
                    const userbooking=await bookingdetails.find({});
                        
                    const admins=await admin.find({});
                    const cars=await cardetails.find({});
                    // .populate(
                    //     {
                    //         path: 'userid',
                    //         select:
                    //           'name email password',
                    //     }
                    // ).exec();
                    // const caralloted=await bookingdetails.find({carid:});
                    // const cars=await cardetails.find(await cardetails.populate([{path: 'userid', select: 'name email password'}]));
                    console.log(userbooking);
                    return res.render('admin',{currentuser:user,users:users,bookings:userbooking,admins:admins,cars:cars});
                }
                fun();
                }
                
        }
        else
        {
            return res.redirect("back");
        }
    })
   
    
})

app.listen(port,()=>
{
    console.log('server running at port ',port);
})