//const express = require('express')
const api = require('express').Router()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
//api.use(express.json())

const util = require('util');

const readFromFile = util.promisify(fs.readFile);

api.get('/notes', (req, res) => {
    console.info(`${req.method} request received for api`)
    readFromFile('./db/db.json', 'utf8')
        .then((notes) => {
            //console.log([].concat(JSON.parse(notes)))
            notes = [].concat(JSON.parse(notes))
            return res.json(notes)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

api.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`)
    const note = {
        ...req.body,
        id: uuidv4()
    }

    readFromFile('db/db.json', 'utf8')
        .then((notes) => {
            //console.log(notes)
            const jsonNotes = JSON.parse(notes)
            //console.log(jsonNotes)
            jsonNotes.push(note)
            //console.log(jsonNotes)
            fs.writeFile('db/db.json', JSON.stringify(jsonNotes), (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully");
                }
            })
        })
        .then((notes) => {
            res.json(notes)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

module.exports = api