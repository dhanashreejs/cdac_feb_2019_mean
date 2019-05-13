var express=require('express');
var app=express();
var body_parser=require('body-parser');
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));

//http://localhost:5656/ =>default get method
app.get("/",function(request,response){
    response.sendFile(__dirname+"/index.html",function(err){
        if(err==undefined){
 console.log("Error while loading default landing page");
        }
    });
});
//To fetch all books from my-web i.e.
//http://localhost:5656/my-web/
var router= require('express').Router();
app.use("/my-web",router);
// Set default API response
router.get('/', function (req, res) {
    res.json({
    status: 'API Its Working',
    message: 'Welcome to RESTAPI crafted with love!'
    });
});
//making connection with mongodb
var mongoose=require('mongoose');
//build connection 1.mongodb:use mydb
mongoose.connect("mongodb://localhost:27017/mydb",
{useNewUrlParser:true});
//get connection object
db=mongoose.connection;
//1st Create Schema :books
var bookSchema=mongoose.Schema({
    bookId:{type: Number,require:true},
    bookName:{type: String,require:true}
});

//2nd Load schema if present use other wise creates books
var Book = module.exports = mongoose.model('book', bookSchema);
//3rd fetch schema
module.exports.get = function (callback, limit) {
    Book.find(callback).limit(limit);
}
//http://localhost:5656/books 
//app.get('/books')
//http://localhost:5656/my-web/books 
router.get('/books', function (req, res) {
    //Load Model 
    Book.get((err,books)=>{
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        console.log("Get contacts",books);
        res.json({
            status: "success",
            message: "Books retrieved successfully",
            data: books
        });
    });
});
//http://localhost:5656/my-web/books/:bookId
router.get('/book/:bookId',function(req,res) {
    Book.findOne({bookId:req.params.bookId}, function (err, book) {
        if (err)
            res.send(err);
        res.json({
            message: 'Book details loading..',
            data: book
        });
    });
});




// Setup server port
var port = process.env.PORT || 5656;
//express server 
app.listen(port,function(){
    console.log("Server Listening at http://localhost:5656/");
});