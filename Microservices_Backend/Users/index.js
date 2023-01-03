const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./src/users-routes');
const HttpError = require('./src/http-error');

const StartServer = async() => {
  const port = 8003;
  const app = express();
  
  app.use(bodyParser.json());
  app.use('/', routes);
  
  app.use((req, res, next) => {
      const error = new HttpError('Could not find this route.', 404);
      throw error;
    });
  
  app.use((error, req, res, next) => {
    if (req.file) {
      fs.unlink(req.file.path, err => {
        console.log(err);
      });
    }
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
  });

  await mongoose
  .connect(
    `mongodb+srv://danonex98:Projektwpiatek-27@users.4qp3gog.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('########## Users db connected ##########');
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });
}

StartServer();