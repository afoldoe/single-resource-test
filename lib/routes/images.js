const express = require(`express`);
const router = express.Router();
const bodyParser = require(`body-parser`).json();
const Image = require(`../models/image`);

module.exports = router

  .get(`/`, (req, res, next) => {
    Image.find({})
      .then(data => res.send(data)
      .catch(next));
  })

  .post(`/`, bodyParser, (req, res, next) => {
    new Image(req.body).save()
      .then(data => res.send(data))
      .catch(next);
  });
