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
    },
    {
        timestamps:true
    }
)

const Login= new mongoose.model("login-Details",loginschema);
module.exports=Login;

// const insertdata= async (name,pass,email) =>
// {
//    try{
//     const newuser= new Login(
//         {
//             name:name,
//             password:pass,
//             Email:email
//         }
//     )
//     const result=await newuser.save();
//     console.log(result);
//    }catch(err)
//    {
//     console.log(err.message);
//    }
// }

// insertdata("Anuarg","12345644","anurag21214@knit.ac.in");
// const btn=document.querySelector(".sign-in").addEventListener("click",() =>
// {
//     alert("hii");
//     insertlogindetails("anurag","2333","hii@knit.ac.in")
// })

