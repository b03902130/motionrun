const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

const Users = require('./routes/Users')
const HomePage = require('./routes/HomePage')
app.use(express.static('build'));

app.use('/users', Users);
app.use('/', HomePage);

app.use('*', (req, res) => {
    res.status(200).sendFile(__dirname + '/build/index.html')
})

module.exports = app;
