const mongoose=require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/CarRental")
.then(()=> console.log("car-details database connected"))
.catch(err => console.log(err.message));

const carchema=new mongoose.Schema(
    {
        src:String,
        carname:String,
        rate:Number,
        type:String,
        ownername:String,
        carnumber:String
    },{
        timestamps:true
    }
)

const Car_details= new mongoose.model("Cars-details",carchema);
module.exports=Car_details;