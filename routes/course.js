// it return function called express
const express = require("express");
const Joi = require("joi")
var mongoose = require('mongodb');
const bodyparser = require("body-parser")

var __dir = "/home/shashikant/Desktop/Practice/express-demo/";

// it returns objects of express which is stored in router
const router = express.Router();

router.use(bodyparser.urlencoded({ extended: true }))

router.use(express.json())


// Connection URL
var db = 'mongodb://localhost/example';

mongoose.connect(db);

// MongoClient.connect(url, (err, client) => {
//     if (err) return console.log(err)
//     db = client.db('myProjectTwo') // whatever your database name is
//     const col = db.collection('BooksData');     //collection created
//     app.listen(port, () => {
//         console.log('listening on ' + port);
//     })
// })


// app.get has two argument one is url of site and
//  second is callback function
// callback function two argument one is request and other is response
router.get("/api/courses", (req, res)=>{
    res.send(courses);
});

router.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("Course with given id not found.")
    }
    else{
        res.send(course)
    }
});

router.get("/",(req,res)=>{
    res.sendFile(__dir+"signup.html");
});

router.post("/signup", (req, res)=>{
    
    console.log(req.body)
    
        id= courses.length + 1,
        fname= req.body.fname,
        lname= req.body.lname,
        email= req.body.email,
        password= req.body.password
    
    
});













// app.put();
router.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The genre with the given ID was not found.');
  
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    course.title = req.body.title,
    course.author = req.body.author; 
    res.send(course);
  });

// app.delete();
router.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The genre with the given ID was not found.');
  
    const index = courses.indexOf(course);
    courses.splice(index, 1);
  
    res.send(course);
  });

// validation
  function validateGenre(course) {
    const schema = {
      title: Joi.string().min(3).required(),
      author:Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
  }

  
module.exports = router