const bodyParser=require("body-parser");
const { dirname } = require("ejs/ejs");
const express=require("express");
const date=require(__dirname+'/date.js');
const app=express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

var items=['Buy Food','Cook Food','Eat Food'];
var work_items=[];

app.get('/',function(req,res){
    let day=date.getDate();
    res.render('list',{
        listType:day,
        newItems:items
    })
    }
);

app.post('/',function(req,res){
    if(req.body.list==='Work'){
        work_items.push(req.body.todo);
        res.redirect('/work');
    }
    items.push(req.body.todo);
    res.redirect('/');
})

app.get('/work',function(req,res){
    res.render('list',{
        listType:"Work List",
        newItems:work_items  
    }
    )
})

app.post('/work',function(req,res){
    work_items.push(req.body.todo);
    res.redirect('/work');
})

app.listen(3000,function(){
    console.log("Server started on port 3000");
})