const express = require('express')
const api = require('express').Router()
const fs = require('fs')
api.use(express.json())
const { v4: uuidv4 } = require('uuid');

const util = require('util');

const readFromFile = util.promisify(fs.readFile);

api.get('/notes', (req, res) => {
    console.info(`${req.method} request received for api`)
    readFromFile('db/db.json', 'utf8')
    .then((notes) => {
        return res.json(JSON.parse(notes))
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
    console.log('created note')

    readFromFile('db/db.json', 'utf8')
    .then((notes) => {
        res.json(JSON.parse(notes))
    })
    .then((notes) => {
        JSON.parse(notes).push(note)
    })
    .then((notes) => {
        fs.writeFile('db/db.json', JSON.stringify(notes))
    })
    .catch((err) => {
        res.status(500).json(err)
    })

    
})

module.exports = api