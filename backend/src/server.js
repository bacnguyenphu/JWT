const express = require('express')
const configViewEngine = require('./config/viewEngine')
const routes = require('./routes/web')
const app = express()
const connection = require('./config/connectDB')
require('dotenv').config()

const port = process.env.PORT||8083

app.use(express.json());
app.use(express.urlencoded({extended:true}));
configViewEngine(app)

connection()

app.use('/', routes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})