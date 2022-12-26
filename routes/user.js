const express=require('express');

const router=express.Router();
const logindetails= require('../model/login-details');
const cardetails= require('../model/car-details');
const bookingdetails= require('../model/booking_details');
const admin= require('../model/admin');

router.get('/',async function(req,res)
{
    if(req.cookies.user_id)
    {
    const cars_list=await cardetails.find({})
    .sort({rate:-1});
    return res.render('home',{cars:cars_list,user:req.cookies.user_id});
    }
    else{
        return res.render('error',{error:"Login to continue",errorroute:"/home"});
    }
});
router.get('/booking/:id',async function(req,res)
{
    if(req.cookies.user_id)
    {
    const car= await cardetails.findOne({_id:req.params.id});
    console.log(car);
    return res.render('booking',{car:car});
    }
    else{
        return res.render('error',{error:"Login to continue",errorroute:"/home"});
    }
    
})


router.post('/book',async function(req,res)
{
    if(req.cookies.user_id)
    {
    try{
        const newbooking= new bookingdetails(
            {
                firstname:req.body.firstname ,
                lastname:req.body.lastname ,
                email:req.body.email ,
                phoneno:req.body.phoneno ,
                passengercount:req.body.passengercount ,
                pickupdate:req.body.pickupdate ,
                dropoffdate:req.body.dropoffdate ,
                days:req.body.days,
                price:req.body.carrate*req.body.days,
                userid:req.cookies.user_id,
                carid:req.body.carcode
            }
        )
        const result=await newbooking.save();
        // console.log(result);
        return res.redirect('/user/payment',{price:req.body.carrate*req.body.days});
    }catch(err)
    {
        console.log(err.message);
    }
}
else{
    return res.render('error',{error:"Login to continue",errorroute:"/home"});
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

router.get('/payment',function(req,res)
{
    if(req.cookies.user_id)
    return res.render('payment',{price:"1000"});
    else{
        return res.render('error',{error:"Login to continue",errorroute:"/home"});
    }
})
router.get('/error',function(req,res)
{
    return res.render('error',{error:"Wrong Login Credential",errorroute:"/"});
})

router.get('/account',async function(req,res)
{
    if(req.cookies.user_id)
    {
    const user=await logindetails.findOne({_id:req.cookies.user_id})
    const userbooking=await bookingdetails.find({userid:req.cookies.user_id})
    // console.log(user,userbooking);
    return res.render('myaccount',{user:user,userbooking:userbooking}); 
    }
    else{
        return res.render('error',{error:"Login to continue",errorroute:"/home"});
    }
})
router.get('/signout',function(req,res)
{
    res.clearCookie("user_id");
    return res.redirect("/");
})
module.exports=router;