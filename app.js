//BACKEND: all logs will log in the terminal - the server console//

const express = require( 'express' );
const app = express(); // creates an instance of an express application
const chalk = require('chalk');
//path is used to build up an absolute path using the __dirname functionality
const path = require('path');
//note: video uses combo of 'fs', 'path' and 'mime' to build up his own custom middleware function to send a file: NOT NEEDED, using express.static
const nunjucks = require('nunjucks');
const routes = require('./routes');
const bodyParser = require('body-parser');

//nunjucks boilerplate: simply reuse this everytime I want to use nunjucks templating.
nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);


//MIDDLEWARE prior to routes//
//Body parser is for html form submits
app.use(bodyParser.json());//specifically for ajax for submits
//if no path is specified for the app.use functions, it assumes a path of '/'
app.use(bodyParser.urlencoded({ extended: false }));//specifically for html submits

//ROUTING:
////same as:
//app.use(routes);
////'landing' is always index.js in the routing folder unless otherwise specified!
app.use('/', routes);

//we use __dirname to grab hold of the absolute path to the root of this folder and then add on additional routing from there.
//This is needed for sendFile, renderFile etc, anything that doesn't take relative paths.
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.on('finish', function() {
    console.log(req.method, req.path, res.statusCode);
  });
    next();//always fire up next() to handle asynchronous functions to continue with workflow.
})


// Always put the listener last
app.listen(3000, function(){
    console.log('server listening');
});
