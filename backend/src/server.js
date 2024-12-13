const express = require('express')
const configViewEngine = require('./config/viewEngine')
const routes = require('./routes/web')
const cors = require('cors');
const app = express()
const connection = require('./config/connectDB')
require('dotenv').config()

const port = process.env.PORT||8083

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', process.env.REACT_URL);
//   // res.header('Access-Control-Allow-Headers', true);
//   // res.header('Access-Control-Allow-Credentials', true);
//   // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
configViewEngine(app)

connection()

app.use('/', routes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})