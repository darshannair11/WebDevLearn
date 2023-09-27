const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB",{ useNewUrlParser:true });

const fruitSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        max:10,
        min:1
    },
    review:String
});

const Fruit=mongoose.model("Fruit",fruitSchema);


const peopleSchema=new mongoose.Schema({
    name:String,
    age:Number,
    favouriteFruit:fruitSchema
})

const People= new mongoose.model("People",peopleSchema);


const Pinapple=new Fruit({
    name:'Pineapple',
    rating:8,
    review:"Good but hard"
})

const person=new People({
    name:"Amy",
    age:12,
    favouriteFruit:Pinapple
})
Pinapple.save();
person.save();

const kiwi=new Fruit({
    name:"Kiwi",
    rating:7,
    review:"Bit sour"
})

const orange=new Fruit({
    name:"Orange",
    rating:6,
    review:"Good for your health"
})

const Banana=new Fruit({
    name:"Banana",
    rating:9,
    review:"Tasty and Healthy"
})


async function updater(rating_mod){
    await Fruit.updateOne({name:'Banana'},{rating:rating_mod});
}

// async function deleter(){
//     return People.deleteMany({name:'John'});
// }

// let res=deleter();
// res.finally(function(){
//     mongoose.connection.close();
// })

let data= Fruit.find();
data
.then(function(fruits){
    fruits.forEach(function(fruit){
        console.log(fruit.name);
    })
})








