const express=require('express');
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    res.send("Your answer is "+(Number(req.body.num1)+Number(req.body.num2)));
    res.send("Thanks for posting");
})
app.get('/bmicalculator',function(req,res){
    res.sendFile(__dirname+"/bmiCalculator.html");
})
app.post('/bmicalculator',function(req,res){
    var weight=Number(req.body.weight);
    var hieght=Number(req.body.height)/100;
    var bmi=(weight/Math.pow(hieght,2));
    res.send("Your BMI is "+bmi)
})
app.listen('3000');