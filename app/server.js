'use strict';

const express = require('express');
const path = require('path')
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/../', 'node_modules')))

const messages = require('./routes/classifieds');

app.use('/classifieds',messages);

app.use('*', function(req, res, next) {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')})
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
