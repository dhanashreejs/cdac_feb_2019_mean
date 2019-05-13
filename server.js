// Import express
let express = require('express')
// Initialize the app
let app = express();



// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Configure bodyparser to handle post requests

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost:27017/resthub',{ useNewUrlParser: true });
var db = mongoose.connection;


// Send message for default URL
// app.get('/', (req, res) => res.send('Hello World with Express'));
app.get('/', (req, res) => res.sendFile(__dirname+"/index.html",(err)=>{
    if(err){
        console.log("Error :"+err);
    }
}));
// Import routes
let apiRoutes = require("./api-routes")
// Use Api routes in the App
app.use('/api', apiRoutes);

// Setup server port
var port = process.env.PORT || 4200;
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});