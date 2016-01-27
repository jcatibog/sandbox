var express = require('express');
var mongojs = require('mongojs');
var app = express();
var db = mongojs('catalog', ['products']);

app.get('/', function (req, res) {
    res.send('It works!');
});

app.get('/products[/:id]', function (req, res) {
    console.log('Fetching products...');
    var requestCompleted = function (err, docs) {
        if (err) {
            res.send(err);
        }
        console.log('Sending products...');
        res.json(docs);
    };
    if (req.params.id) {
        db.products.findOne({
            _id: mongojs.ObjectId(req.params.id)
        }, requestCompleted);
    } else {
        db.products.find(requestCompleted);
    }
});

app.listen(3000);
console.log('Server running on port 3000...');
