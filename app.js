const express = require("express")
const bodyParser = require("body-parser")
var app = express()

require('./routes')(app)

app.use('/static',express.static(__dirname + '/public'))
// setting environment variable
const port = process.env.PORT || 5000
app.listen(port,()=>{console.log(`Server run on ${port} port`)});

module.exports = app