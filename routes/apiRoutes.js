const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    writeToFile,
    readAndAppend
} = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
router.get('/notes', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for posting new note 
router.post('/notes', (req, res) => {
    const { title, text } = req.body;

    if (!title || !text) {
        console.log('Error in adding note: Missing title or text');
        return res.status(400).json({ error: 'Missing title or text' });
    }

    const db = readFromFile('./db/db.json').then((data) => JSON.parse(data));

    if (!db) {
        const newArray = [];
        readAndAppend(newArray, './db/db.json');
    }

    const newNote = {
        title,
        text,
        id: uuidv4()
    };

    try {
        readAndAppend(newNote, './db/db.json')
        res.status(201).json('Note added successfully')
    }
    catch (error) {
        console.error('Error in adding note', error);
        res.status(500).json({ error: 'Failed to add note' });
    }
});


// DELETE Route for a specific note
router.delete('/notes/:id', (req, res) => {
    const notesId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id !== notesId);

        writeToFile('./db/db.json', result);

        // Respond to the DELETE request
        res.json(`Item ${notesId} has been deleted 🗑️`);
      });
  });

module.exports = router;
