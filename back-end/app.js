const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');
express.urlencoded({ extended: true })
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/uploads', express.static(path.join(__dirname + '/uploads')));

require('./src/model/db')
app.use('/api/v1/admin', require('./src/routes/AdminRoute'))
app.use('/api/v1/movie', require('./src/routes/MovieRoute'))
app.use('/api/v1/user', require('./src/routes/UserRoute'))

app.listen(3001, () => {
    console.log('port is listening')
})