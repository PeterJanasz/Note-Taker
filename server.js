//dependencies
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// require html and api routes
const apiRouter = require("./routes/api.js");
const htmlRouter = require("./routes/html.js");


// link routes to path
app.use("/api", apiRouter);
app.use(htmlRouter);


//app listener to start the server
app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`)
);