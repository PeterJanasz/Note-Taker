//Dependencies
const express = require('express');
const router = express.Router();
const path = require('path');

// GET Route for homepage
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/../routes/public/index.html'));
});
// GET Route for notes page
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '/../public/notes.html'));
});

module.exports = router;