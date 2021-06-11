const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var App = {};
App.db = mongoose;
App.db.connect(
    'mongodb://localhost/affluencer',
    { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }
);

const server = express();
const port = 3000;

server.use(cors({ origin: ['http://localhost:8080'] }));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

App.utils = require('./common.js');
App.models = require('./models/models.js')(App);
App.controllers = require('./controllers/controllers.js')(App);

const routes = require('./routes/config.js');
routes(App, server);
server.listen(port);

server.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Affluencer server started on port ${port}`);

