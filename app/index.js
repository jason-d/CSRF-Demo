var express = require('express');
var path = require('path');
var controller = require('./controller.js');

var app = express();

var notFoundHandler = function(req, res) {
    res.statusCode = 404;
    res.description = 'Page not found.';
    res.render('notFound');
};

var errorHandler = function(err, req, res, next) {
    console.log("****ERROR****");
    console.log(err);
    
    res.statusCode = 500;
    res.description = 'Something went wrong';
    res.render('error');
};

var authenticate = function(req, res, next) {
    if (req.session.username != null) {
        next();
    } else {
        res.setHeader('WWW-Authenticate', 'realm="My realm"');
        res.redirect('/login');
    }
};

app.configure(function() {
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: '{my_session_secret}' }));
    app.use(app.router); //Enable error handling
    app.use(notFoundHandler); //If no routes match, this will be called
    app.use(errorHandler); //Express knows a method with 4 params, is for handling errors
});

app.get('/', function (req, res) {
    res.redirect('/vote');
});
app.get('/login', function (req, res) {
    res.render('login');
});
app.post('/login', controller.login);
app.get('/vote', authenticate, function (req, res) {
    res.render('vote');
});
app.post('/vote', authenticate, controller.vote);
app.get('/results', controller.results);

app.listen(process.env.PORT, process.env.IP);
console.log('csrf-demo running...');