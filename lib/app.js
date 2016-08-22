const express = require(`express`);
const app = express();
const url = require(`url`);
const path = require(`path`);

const images = require(`./routes/images`);
app.use(`/`, images);








app.use((err, req, res, next) => {
  res.status(err.code || 500).json({error: err.error || err.message || err});
});

module.exports = app;