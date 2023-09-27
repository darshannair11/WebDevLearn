const express = require('express');
const app=express();
app.get("/",function(req,res){
    res.send("<h1>hello world</h1>");
});
app.get("/contact",function(req,res){
    res.send("Contact me at this gmail");
})
app.get("/about",function(req,res){
    res.send("<h1>My Name is Darshan</h1>");
});
app.listen(3000,function(){
    console.log("Server started on port 3000");
});