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
        pickupdate:Date ,
        dropoffdate:Date ,
        days:String,
        price:String,
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