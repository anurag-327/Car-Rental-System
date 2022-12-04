// const logindetails= require('./login-details');
// const cardetails= require('./car-details');

const mongoose=require('mongoose');


// const bookingdetails= require('./model/booking_details');
// const admin= require('./model/admin');
mongoose.connect("mongodb://0.0.0.0:27017/CarRental")
.then(()=> console.log("Booking Details database connected"))
.catch(err => console.log(err.message));

const bookingdetailsschema=new mongoose.Schema(
    {
        firstname:String ,
        lastname:String ,
        email:String ,
        phoneno:Number ,
        passengercount:Number ,
        userstreetaddress:String ,
        usercity:String ,
        userregion:String ,
        userpincode:Number ,
        pickupstreetaddress:String ,
        pickupcity:String ,
        pickupregion:String ,
        pickuppincode:Number ,
        pickupdate:Date ,
        destinationstreetaddress:String ,
        destinationcity:String ,
        destinationregion:String ,
        destinationpincode:Number ,
        dropoffdate:Date ,
        extranote:String ,
        userid:{
             type: mongoose.Schema.Types.ObjectId,
             ref:'login-details'
        },
        carid:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'cars-details'
        }
    },{
        timestamps:true
    }
)

const bookingdetails= new mongoose.model("Booking-details",bookingdetailsschema);
module.exports=bookingdetails;