const { error, table } = require("console");
const fs=require("fs");
fs.writeFile('message.txt',"Checking if it works", (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  }); 

fs.readFile("message.txt","utf8",function(err,data){
    if(err) throw err;
    console.log(data);
});