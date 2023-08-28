//dependencies
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//app listener to start the server
app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`)
);