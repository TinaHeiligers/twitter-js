// const express = require('express');
// const router = express.Router();
var router = require('express').Router();//creates a new instance of a router.
var tweetBank = require('../tweetBank');//our data


router.get('/', function (req, res, next) {
  // res.send('reached modular route');//checking we're getting our routes for initial checks.
  let tweets = tweetBank.list();//getting our data in
  res.render( 'index', { tweets: tweets, showForm: true } );//adding the form as true only on the index page
  next();
});

router.get('/users/:FullName', function(req, res) {
  var nameCaptured = req.params.FullName;//grabbing the name that was passed into the path
  var list = tweetBank.find( {name: nameCaptured});//the second name here is what was entered into the url
  //we want to render the content in the list array for the given name of a specific object in the array.
  res.render( 'index', { tweets: list, showForm: true, username: req.params.nameCaptured } );
});

router.get('/tweets/:id', function(req, res) {
  var id = req.params.id;
  var list = tweetBank.find( {id: id});
  console.log("logging list next")
  console.log(list);
  //we want to render the content in the list array for the given name of a specific object in the array.
  res.render( 'index', { tweets: list } );
});

router.post('/tweets', function(req, res, next) {
  if (!req.body) return res.sendStatus(400);
  //we need body parser to call an object on the body.
  tweetBank.add(req.body.name, req.body.text);
  res.redirect('/');//sends the route to the main index to show the enw one just added
  next();
});


module.exports = router;
