// We have to use these files in in Express.js
const Express = require("express");
const myRouter = Express.Router();
const FileSystem = require("fs");

myRouter.get('/app/student' , function(req , res){   //app.get('/app/student' , function(req , res){
    // res.send("Hello");
    //c:\Users\hp\Desktop\Student Project --> __dirname
    // res.sendFile(myPath.join(__dirname , '\studentForm.ejs')); //If we directly __dirname + '\studentForm.ejs' then it will not join properly
    // console.log(req.url);  -> /myRouter/student
    res.render("studentForm.ejs");
})

myRouter.get('/home' , function(req , res){   //myRouter.get('/home' , function(req , res){ this renders first tiem directly to home
    // res.sendFile(myPath.join(__dirname , "./home.ejs"))
    res.render("home.ejs")
})

myRouter.get('/display/student' , function(req , res){
    //Logic to display the data
    const studentData = FileSystem.readFileSync('studentData.json');
    const actualStudentData = JSON.parse(studentData);
    // console.log(actualStudentData);
    //HTML files are static u cannot send the data to html   So don't use HTML files when working with Node 

    //To overcome this we have to use EJS ----> Embedded Javscript
    actualStudentData.sort(function(a,b){
        // return a.studentName > b.studentName  //If we have to sort them acc to roll no then we a.rollno - b.rollno for asce
        if(a.studentName > b.studentName){ return 1 }  //if greater than then sorting will happen else not
        return -1
    })
    //Using EJS is just like HTML file but EJS collects data 
    // res.sendFile(myPath.join(__dirname , './DisplayData.ejs')) //After putting the ejs files in views folder no need to give path
    res.render("DisplayData.ejs" , { studentsData : actualStudentData})  //actialStudentData holds tha array of objects we have
    //  to send this to ejs files but it needs in object so we create key student 
    // a =[12,24,45,66,5756,234]
    //a.sort(function(a,b){ return a - b })  //This will sort in ascending order and if b-a then it will sort in descending order
    
})

// Built logic to display the details of specific student
myRouter.get("/display/student/:rollno" , function(req , res){   // :before is for variable
    // console.log(req.params.rollno);
    const collectedRollno = req.params.rollno;  //First check if requested student rollno is there in studentData.json or not
    const studentsDataa = FileSystem.readFileSync('studentdata.json');
    const updatedStudentData = JSON.parse(studentsDataa);  //This conatins tha array all student details object
    for(let i of updatedStudentData){
        if(i.studentRollno == collectedRollno ){
            res.render('rollno.ejs' , { details : i})   //render is like return if condn satisfies then ctrl doesn't goes downward
        }
    }
    res.render("505 error.ejs")  //If after running for loop student is not found then render this file else render 
    // the file in the for loop

})
myRouter.post('/collect/data' , function(req , res){
    // All the details are coming from browser to server are in form of req
    // console.log(req);
    // console.log(req.body.myrollno)
    const rollno = req.body.myrollno
    const name = req.body.myname
    const age = req.body.myage

    const student={
        "studentRollno" : rollno,
        "studentName" : name,
        "studentAge" : age  //After keeping this keys in quotes it will qutomatically converted to JSON
    } //{ studentRollno: '30', studentName: 'Ashok', studentAge: '53' } for one student for many u have to create an array
    // And pass this aaray to JSON file
    const readData = FileSystem.readFileSync("studentData.json")
    // console.log(readData) //<Buffer 5b 22 48 65 6c 6c 6f 22 5d>   coz we are reading JS code from JSON
    const updateData = JSON.parse(readData)
    // console.log(updateData);
    updateData.push(student)   // Pushing the student Data to JSON     { studentRollno: '30', studentName: 'Ashok', studentAge: '53' }
    const jsonData = JSON.stringify(updateData);   //Converting into JSON
    FileSystem.writeFileSync('studentData.json' , jsonData)
    res.redirect("/home")
})

//To handle invalid path   always kwpt this at last
myRouter.get("/*" , function(req , res){
    res.render("error.ejs")   
})  //we can also use use method to this

module.exports = myRouter
//myRouter is variable holding all the get() methods