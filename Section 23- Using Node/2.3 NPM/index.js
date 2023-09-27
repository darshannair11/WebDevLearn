//var generateName = require('sillyname');

import generateName from "sillyname";
import superheroesName from "superheroes";
var sillyName = generateName();
console.log('My name is '+sillyName);
console.log("My super hero name is "+superheroesName.random());