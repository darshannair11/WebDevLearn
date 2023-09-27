const express=require('express');
const https=require('https');
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post('/',function(req,res){
    var lat=(req.body.lat);
    var lon=(req.body.lon);
    const url="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid=92eae8d2f722938096677636b22c59bf";
    https.get(url,function(response){
        response.on("data",function(data){
            const weather_data=JSON.parse(data);
            var temp=weather_data.main.temp;
            console.log(temp);
            var desc=weather_data.weather[0].description;
            const icon=weather_data.weather[0].icon;
            const imageUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temperature at these coordinates is "+temp+" C</h1>\n<h2>The weather is currently "+desc+"</h2>");
            res.write("<img src="+imageUrl+">");
            res.send();
        })

    }); 
});


// var lat="25.2048";
//     var lon="55.2708";
//     const url="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid=92eae8d2f722938096677636b22c59bf";
    // https.get(url,function(response){
    //     response.on("data",function(data){
    //         const weather_data=JSON.parse(data);
    //         var temp=weather_data.main.temp;
    //         console.log(temp);
    //         var desc=weather_data.weather[0].description;
    //         const icon=weather_data.weather[0].icon;
    //         const imageUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
    //         res.write("<h1>The temperature in Dubai is "+temp+" C</h1>\n<h2>The weather is currently "+desc+"</h2>");
    //         res.write("<img src="+imageUrl+">");
    //         res.send();
    //     })

    // });

app.listen(3000,function(){
    console.log("Server started on 3000");
});
