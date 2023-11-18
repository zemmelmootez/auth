const express = require('express')
const app = express()
const port = 8000
const userRoutes=require("./routes/userRoutes")
const connect = require('./helpers/dbConnect')


connect()
app.use(express.json())
app.use('/api',userRoutes)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))