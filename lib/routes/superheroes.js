const express = require(`express`);
const router = express.Router();
const bodyParser = require(`body-parser`).json();
const Superhero = require(`../models/superhero`);

module.exports = router

  .get(`/`, (req, res, next) => {
    Superhero.find({})
      .then(data => res.send(data)
      .catch(next));
  })

  .post(`/`, bodyParser, (req, res, next) => {
    new Superhero(req.body).save()
      .then(data => res.send(data))
      .catch(next);
  });
