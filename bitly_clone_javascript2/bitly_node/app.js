'use strict';
// import { executeQuery } from './database/database.js';

const express = require('express')
const eta = require('eta')
const database = require('./database/database.js')
const controller = require('./controllers/urlController.js')
const bodyParser = require('body-parser');
const { response } = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//set view engine
// app.set("view engine","jade")
app.engine("eta", eta.renderFile)
app.set("view engine", "eta")
app.set("views", "./views")

app.route('/')
  .get((req, res) => {
    // controller.testQuery()
    res.render('main')
  })
  .post((req, res) => {
    console.log("POST request")
    controller.generateShortUrl(req.body, res)
  })

app.route('/shortened/:id')
  .get((req, res) => {
    controller.shortenedUrl(req.params.id, res)
  })

app.route('/:shorturl')
  .get((req, res) => {
    if (req.params.shorturl === "random") {
      controller.randomUrl(res)
    } else {
      controller.openShortUrl(req.params.shorturl, res)
    }
  })

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`)
})