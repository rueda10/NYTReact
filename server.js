// NPM dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
// local dependencies
var Article = require('./models/Article.js');

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// Mongoose setup
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect("mongodb://localhost/nytreact");
}
var db = mongoose.connection;

db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});


// ROUTES
// query DB for all saved articles
app.get('/api/saved', function(req, res) {
    Article.find({}).exec(function(err, doc) {
        if (err) {
            throw err;
        }
        res.send(doc);
    });
});

// save article to DB
app.post('/api/saved', function(req, res) {
    const article = req.body.title;
    const url = req.body.url;

    Article.create({ title: title, url: url }, function(err, doc) {
        if (err) {
            throw err;
        }
        res.send(doc._id);
    });
});

// delete saved article from DB
app.delete('/api/saved', function(req, res) {
    Article.find({ url: req.param('url')}).remove().exec(function(err, data) {
        if (err) {
            throw err;
        }
        res.send("Deleted");
    });
});

// -------------------------------------------------

// Main "/" Route. This will redirect to our rendered React application
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

// Starting our express server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
