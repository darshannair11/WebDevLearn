const express=require("express");
const mongoose=require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const app=express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const articleSchema=mongoose.Schema({
    title:String,
    content:String
})

const Article=mongoose.model('Article',articleSchema);

app.route('/articles')
    .get(function(req,res){
    Article.find({}).then(function(data){
        res.send(data);
    }).catch(function(err){
        res.send(err);
    })
}).post(function(req,res){
    let title=(req.body.title);
    let content=(req.body.content);
    const article= new Article({
        title:title,
        content:content
    })
    article.save().then(function(){
        res.send("Succefull Added");
    }).catch(function(err){
        res.send(err);
    })
}).delete(function(req,res){
    Article.deleteMany().then(function(data){
        res.send("Succesfully Deleted all articles");
    }).catch(function(err){
        res.send(err);
    })
});

app.route('/articles/:articleTitle')
    .get(function(req,res){
        let title_temp=req.params.articleTitle;
        Article.findOne({title:title_temp}).then(function(data){
            if(data){
                res.send(data);
            }else{
                res.send("No articles of such were found");
            }
        }).catch(function(err){
            res.send(err);
        })
    })
    .put(function(req,res){
        let title_temp=req.params.articleTitle;
        Article.replaceOne({title:title_temp},{title:req.body.title,content:req.body.content}).then(function(){
            res.send("Succefull updated 1 article");
        }).catch(function(err){
            res.send(err);
        })
    })
    .patch(function(req,res){
        let title_temp=req.params.articleTitle;
        Article.updateOne({title:title_temp},{$set:req.body}).then(function(){
            res.send("Succefull patched 1 article");
        }).catch(function(err){
            res.send(err);
        })
    })
    .delete(function(req,res){
        let title_temp=req.params.articleTitle;
        Article.deleteOne({title:title_temp}).then(function(){
            res.send("Succefull deleted 1 article");
        }).catch(function(err){
            res.send(err);
        })
    });

app.listen(3000,function(){
    console.log("Server Started on port 3000");
});

