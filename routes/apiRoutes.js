const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const db = require('../db/db.json');

router.post('/notes', (req, res) => {
    fs.readFile('../db/db.json', 'utf-8', (err, results) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(results);
        }
    })
})

module.exports = router;

// const obj = {
//     "title": "xyz",
//     "text": "xyz",
//     "id": uuidv4()
// }
// db.push(obj);

// fs.writeFileSync('../db/db.json', JSON.stringify(db), (err, results) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log('successful results', results);
//     }
// })