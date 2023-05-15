const express = require("express");
const fs = require('fs');
const path = require('path');
const exphbs = require("express-handlebars");
const hbs = exphbs.create();
const passport = require('passport');
const session = require('express-session');

//server setup
const app = express();
const port = process.env.PORT || 3001;

// session set up middleware for passport
app.use(session({
  secret: 'bookers', // e.g
  resave: false,
  saveUninitialized: true //false

}));

// intialize passport with express sessiom
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

// importing login routes and controllers
const loginRoutes = require ('./routes/loginRoutes');
//const loginController = require('./controllers/loginController');

// use imported routes
app.use('/', loginRoutes);
//app.use ('/', dashboardRoutes);

app.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}.`);
  });

  // create passport-config.js for passport,js stategies (serialization/deserialization of users) and import into server.js 