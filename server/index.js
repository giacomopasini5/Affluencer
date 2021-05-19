const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes/config');

mongoose.connect('mongodb://localhost/affluencer', { useNewUrlParser: true, useFindAndModify: false });

const port = 3000;
const app = express();

app.use(cors({ origin: ['http://localhost:8080'] }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
app.listen(port);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Affluencer server started on port ${port}`);