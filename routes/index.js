const express=require('express');

const router=express.Router();

const logindetails= require('../model/login-details');
const cardetails= require('../model/car-details');
const bookingdetails= require('../model/booking_details');
const admin= require('../model/admin');


router.get('/',async function(req,res)
{
    const cars_list=await cardetails.find({})
    .sort({rate:-1});
    return res.render('home',{cars:cars_list,user:req.cookies.user_id});
});
router.get('/home',async function(req,res)
{
    const cars_list=await cardetails.find({})
    .sort({rate:1});
    return res.render('home',{cars:cars_list,user:req.cookies.user_id});
})


router.get('/login',function(req,res)
{
    return res.render('login');
})
router.get('/signup',function(req,res)
{
    return res.render('signup');
})
router.get('/signout',function(req,res)
{
    res.clearCookie("user_id");
    return res.redirect("/home");
})

router.post('/sign-up',function(req,res)
{
    // console.log(req.body);
    if(req.body.password != req.body.confirmpassword)
    {
        console.log(req.body.password,req.body.confirmpassword);
        console.log("fail");
        return res.render('error',{error:"Unmatched Password",errorroute:"signup"});
    }
    else
    {
        // console.log("before break");
        logindetails.findOne({email:req.body.email},async function(err,user)
        {
            // console.log("after break;");
            if(err)
            console.log(err.message);
            // console.log("after err");
            if(!user)
            {
                const createDocument = async () =>
                {
                  try{
                        const newUser=new logindetails(req.body)
                        const result= await newUser.save();
                        // console.log(result);
                      }catch(err)
                     {
                         console.log(err.message);
                     }
                }
                createDocument();
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
router.get('/contact',function(req,res)
{
    if(req.cookies.user_id)
    {
    return res.render('contact');
    }
    else{
        return res.render('error',{error:"Login to continue",errorroute:"/home"});
    }
})
router.post('/login-acc',async function(req,res)
{
    // console.log(req.body);
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
                // return res.redirect('/');
                return res.redirect("/user");
            }
        }
        else
        {
            return res.render('error',{error:"Wrong Login Credential",errorroute:"login"});
        }
    })
   
    
})

// router.use('/home',require('./home'));
router.use('/user',require('./user'));
router.use('/admin',require('./admin'));

module.exports=router;