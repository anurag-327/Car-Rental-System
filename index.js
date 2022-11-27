const express=require('express');
const app=express();
const path=require('path');
const port=process.env.port|| 5000;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./build/pages'));
app.use('/styles/',express.static(path.join(__dirname ,'./build/styles')));
app.use('/Images/',express.static(path.join(__dirname ,'./build/Images')));

app.get('/',function(req,res)
{
    // console.log(loc);
    return res.render('home');
})

app.get('/login',function(req,res)
{
    return res.render('login');
})
app.get('/about',function(req,res)
{
    return res.render('about');
})
app.get('/contact',function(req,res)
{
    return res.render('contact');
})

app.listen(port,()=>
{
    console.log('server running at port ');
})