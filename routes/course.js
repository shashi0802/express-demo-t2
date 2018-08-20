// it return function called express
const express = require("express");
const Joi = require("joi")


// it returns objects of express which is stored in app
const router = express.Router();

router.use(express.json())

// array of courses
const courses = [
    {id: 1, title: 'C++', author: "Raj"},
    {id: 2, title: 'C++', author: "Rajmia"},
    {id: 3, title: 'C++', author: "Rajiya"},
    {id: 4, title: 'C++', author: "Raju"}
];

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

router.post("/api/courses", (req, res)=>{
    const course = {
        id: courses.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    courses.push(course)
    res.send(course)
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