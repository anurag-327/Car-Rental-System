const express=require('express');
const app=express();
const path=require('path');
const cookieParser=require('cookie-parser');
const port=process.env.port|| 8000; 


app.use(cookieParser());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./build/views'));
app.use('/Images/',express.static(path.join(__dirname ,'./build/Images')));
app.use(express.urlencoded());
app.use(express.static(__dirname));

app.use('/',require('./routes/index'));
app.listen(port,()=>
{
    console.log('server running at port ',port);
})