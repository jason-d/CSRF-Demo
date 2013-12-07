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
        res.send(401, { error: 'Not authenticated.' });
    }
};

app.configure(function() {
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.bodyParser());
    app.use(app.router); //Enable error handling
    app.use(notFoundHandler); //If no routes match, this will be called
    app.use(errorHandler); //Express knows a method with 4 params, is for handling errors
});

app.listen(process.env.PORT, process.env.IP);
console.log('csrf-demo running...');