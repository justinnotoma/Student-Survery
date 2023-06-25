const xlsx = require('xlsx')
const express = require('express')

// Creating a sever
const app = express()
app.listen(3000, e=> console.log('listening at port 3000'))
app.use(express.static('public'))