// it return function called express
const express = require("express");
const Joi = require("joi")
var mongoose = require("mongodb").MongoClient;
const bodyparser = require("body-parser")


var __dir = "/home/shashikant/Desktop/Practice/express-demo/";

// it returns objects of express which is stored in router
const router = express.Router();

router.use(bodyparser.urlencoded({ extended: true }))

router.use(express.json())


// Connection URL
var db = "mongodb://localhost:27017/shashi";

mongoose.connect(db, (err, client) => {
    if (err) return console.log(err)
    console.log("Database created!");
    client.close();
})

router.get("/signup", (req, res) => {
    res.sendFile(__dir + "signup.html");
});
router.get("/signin", (req, res) => {
    res.sendFile(__dir + "signin.html");
});

router.post("/signup", (req, res) => {
    var data = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password
    }
    console.log(data)
    mongoose.connect(db, function (err, dbdata) {
        if (err) {
            throw err;
        }
        else {
            var dbo = dbdata.db("Library");
            dbo.collection("Reader").find({ email: req.body.email }).toArray((err, dbdata) => {
                if (err) {
                    throw err;
                } else {
                    if (dbdata.length >= 1) {
                        console.log("You are already logedin")
                        res.redirect("/signin");
                    } else {
                        dbo.collection("Reader").insertOne(data, (err, ress) => {
                            if (err) {
                                throw err;
                            } else {
                                console.log(" document inserted" + ress.insertedCount);
                                res.redirect("/signin");
                            }
                        });
                    }

                }
            });
        }

    });
});

router.post("/signin/profile", (req, res) => {
    var data = {
        email: req.body.email,
        password: req.body.password
    }
    console.log(data)
    mongoose.connect(db, function (err, dbdata) {
        var dbo = dbdata.db("Library");

        dbo.collection("Reader").find(data).toArray(function (err, result) {
            if (result.length >= 1) {
                res.send("welcome to your page");
            }
            else {
                res.redirect('/signin');
            }
        })
    })
});

module.exports = router