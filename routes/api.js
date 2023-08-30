// dependencies 
const express = require('express');
const router = express.Router();
const fs = require('fs');
let notes = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

//get api notes
router.get('/notes', (req, res) => {
    res.json(notes);
});
// POST Route for submitting notes
router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        // push new note into array 
        notes.push(newNote);
        //convert to string
        let notesString = JSON.stringify(notes, null, 3);

        fs.writeFile(`./db/db.json`, notesString, (err) =>
            err
                ? console.error(err)
                : console.log(`New note has been added!`)
        );
        const response = {
            status: 'success',
            body: newNote,
        };
        console.log(response);

        res.status(201).json(response);
    } else {
        res.status(500).json('Error in adding note');
    }
});

// DELETE Route for a specific note
router.delete('/notes/:id', (req, res) => {
    const { id } = req.params;

    fs.readFile("./db/db.json", "utf8", (error, data) =>
        error ? console.error(error) : (notes = JSON.parse(data))
    );

    const deletedNote = notes.filter(note => note.id === req.params.id)

    if (deletedNote) {
        let filteredNotes = notes.filter(note => note.id != req.params.id)
        let notesString = JSON.stringify(filteredNotes, null, 3);
        fs.writeFile(`./db/db.json`, notesString, (err) =>
            err
                ? console.error(err)
                : console.log(`Note deleted!`));

        res.status(200).json(filteredNotes);
    } else {
        res.status(500).json('Error deleting note');
    }
});

module.exports = router;