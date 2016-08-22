const express = require(`express`);
const app = express();
const url = require(`url`);
const path = require(`path`);

const superheroes = require(`./routes/superheroes`);
app.use(`/`, superheroes);








app.use((err, req, res, next) => {
  res.status(err.code || 500).json({error: err.error || err.message || err});
});

module.exports = app;