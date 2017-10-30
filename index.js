const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./db')

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/todo";
var mongodb;


app.use(bodyParser.json({
    limit: '100k',
}))

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/list', function (req, res) {
    db.getAll(mongodb, (err, rs) => {
        res.json(rs);
    })
})

app.get('/get/:id', function (req, res) {
    res.json({})
})

app.post('/insert', function (req, res) {
    res.send('true')
})

app.post('/update', function (req, res) {
    res.send('true');
})

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    
    mongodb = db;
    
    app.listen(3000, function () {
        console.log('Example app listening on port 3000!')
    })
});

module.exports = app;