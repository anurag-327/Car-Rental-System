const express=require('express');

const router=express.Router();
const logindetails= require('../model/login-details');
const cardetails= require('../model/car-details');
const bookingdetails= require('../model/booking_details');
const admin= require('../model/admin');
router.get('/',async function(req,res)
{
    return res.render('loginadmin'); 
})
router.post('/loginadmin',function(req,res)
{
    // console.log(req.body);
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
                // console.log(req.body.password,user.password)
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
                    // console.log(userbooking);
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
module.exports=router;

