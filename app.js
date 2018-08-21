const express = require("express")
var morgan = require('morgan')
const bodyParser = require("body-parser")
var app = express()

app.use(morgan("tiny"));
require('./routes')(app)

app.use('/static',express.static(__dirname + '/public'))
// setting environment variable
const port = process.env.PORT || 5000
app.listen(port,()=>{console.log(`Server run on ${port} port`)});

module.exports = app