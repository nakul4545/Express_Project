//Whenever we try to use express inside Node.js to reduce the length of the code, we need to install express.js first 
// npm install 
//nodemon is used to prevent to reload the changes
// Express module ---> (Variables, Methods And Classes)
// This Express.js file is very large we can't handle so much code in single file so we split these files
// ------------------which is called as ROUTING
const FileSystem = require('fs');
const Express = require('express');
const myPath = require('path');

//When we decalre Express() then we only refer to methods not variables and classes
const app = Express();

const r = require("./routes/myroutes.js");
app.use("/" , r); //To get the home page   Any path that will start with / will go to r
//If u nodemon Express.js then r have the 5 methods and below post methods

app.set("view engine" , "ejs")
app.use(Express.urlencoded())  //This is used to get the data in req after submitting form

app.listen(3002)  //in Express no need to createServer 
