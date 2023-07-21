const express = require('express')
const api = require('./routes/api')
const html = require('./routes/html')
const path = require('path');
const app = express()
const PORT = 3001

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static('public'))
app.use("/api", api)
app.use("/", html)

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
)