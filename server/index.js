const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//global.Task = require('./api/models/taskModel');
//const routes = require('./api/routes/taskRoutes');

mongoose.connect('mongodb://localhost/affluencer', { useNewUrlParser: true, useFindAndModify: false });

const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
app.listen(port);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Affluencer server started on port ${port}`);