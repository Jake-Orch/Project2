const express = require("express");
const fs = require('fs');
const path = require('path');

//routes
const apiRoutes = require('./routes/apiroutes');
const htmlRoutes = require('./routes/htmlroutes');


//server setup
const app = express();
const port = process.env.PORT || 3001;


app.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}.`);
  });
  