const mongoose=require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/CarRental")
.then(()=> console.log("Login details database connected"))
.catch(err => console.log(err.message));

const loginschema=new mongoose.Schema(
    {
         name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
        phoneno:{
            type:String
        }
    },
    {
        timestamps:true
    }
)

const Login= new mongoose.model("admin",loginschema);
module.exports=Login;

