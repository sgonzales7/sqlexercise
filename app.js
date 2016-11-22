// This will be where the file you call to start the project e.g. (node app.js)

// Require the profile file

// Get the argument from the command line which will be called like--node app.js kamijean--the last part is the argument

// Call to the profile function that will call the ajax function

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pgp = require('pg-promise')();
var db = pgp('postgres://postgres:4751@localhost:5432/blog');

app.use(express.static(__dirname + '/css'));

app.set('view engine', 'ejs');

app.set('views', __dirname + '/views'); //dirname is start at node and go to views

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use(function(req, res, next){
    if(req.query._method == 'DELETE'){
        req.method ='DELETE';
        req.url = req.path;
    }
    next();
});

//getting users
app.get('/', function(req, res, next){
    db.any('SELECT * FROM posts')
        .then(function(data){
            return res.render("index", {data:data, name:'Sugar Blog', nav1: 'About Us', nav2: 'Blog', nav3: 'Contact'})
        })
        .catch(function(err){
            return next(err);
        });
});

//edit users
app.get('/posts/:id/edit', function(req,res,next){
    var id = parseInt(req.params.id);
    db.one('select * from posts where id = $1', id)
        .then(function (data) {
            res.render('edit', {data:data, name:'Sugar Blog', nav1: 'About Us', nav2: 'Blog', nav3: 'Contact'})
        })
        .catch(function (err) {
            return next(err);
        });
});

app.post('/posts/:id/edit', function(req,res,next){
    db.none('update posts set name=$1, email=$2, content=$3 where id=$4',
        [req.body.name, req.body.email, req.body.content, parseInt(req.params.id)])
        .then(function () {
            res.redirect('/');
        })
        .catch(function (err) {
            return next(err);
        });
});

app.delete('/:id', function(req, res, next){
    var id = parseInt(req.params.id);
    db.result('delete from posts where id = $1', id)
        .then(function (result) {
            res.redirect('/');
        })
        .catch(function (err) {
            return next(err);
        });
});

app.get('/new', function(req, res){
    res.render("new", { name: 'Add Sugar', nav1: 'About Us', nav2: 'Blog', nav3: 'Contact'});
});

app.post('/new', function(req,res,next){
        db.none('insert into posts(name, email, content)' +
            'values(${name}, ${email}, ${content})',
            req.body)
            .then(function () {
                res.redirect('/');
            })
            .catch(function (err) {
                return next(err);
            });
});

app.get('/show', function(req, res){
    res.render("index", { name: 'Display Sugar', nav1: 'About Us', nav2: 'Blog', nav3: 'Contact'});
});

app.listen(3000, function(){
    console.log("The server is running on localhost:3000")
});