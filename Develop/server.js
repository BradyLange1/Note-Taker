const express = require('express')
const api = require('./routes/api')
const notes = require('./routes/notes')
const path = require('path');
const app = express()
const PORT = 3001

app.use(express.static('public'))
app.use(express.json())
app.use("/api", api)
app.use("/notes", notes)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'))
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname+'/public/notes.html'))
})

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
)