const api = require('express').Router()
const fs = require('fs')
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

api.get('/notes', (req, res) => {
    console.info(`${req.method} request received for api`)
    readFromFile('db/db.json', 'utf8')
    // .then((notes) => {
    //     return notes
    // }) 
    .then((notes) => {
        return res.json(notes)
    })
    .catch((err) => {
        res.status(500).json(err)
    })
})

api.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`)


    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } else {

        }
    })
})

module.exports = api