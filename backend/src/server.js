const express = require('express')
const configViewEngine = require('./config/viewEngine')
const routes = require('./routes/web')
const cors = require('cors');
const app = express()
const connection = require('./config/connectDB')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const port = process.env.PORT || 8083

// app.use(cors());
app.use(cors({
  origin: process.env.REACT_URL, // URL của frontend, ví dụ: 'http://localhost:3000'
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Cho phép gửi cookie/credentials
}));
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', process.env.REACT_URL);
//   res.header('Access-Control-Allow-Headers', true);
//   res.header('Access-Control-Allow-Credentials', true);
//   // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configViewEngine(app)

connection()

app.use('/', routes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})