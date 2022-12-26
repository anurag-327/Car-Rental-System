const logindetails= require('./model/login-details');
const cardetails= require('./model/car-details');
const bookingdetails= require('./model/booking_details');
const admin= require('./model/admin');

module.exports.home=async function(req,res)
{
    const cars_list=await cardetails.find({})
    .sort({rate:-1});
    return res.render('home',{cars:cars_list,user:req.cookies.user_id});
}