const app = require(`./lib/app`);
const http = require(`http`);
const port = process.env.PORT || 3000;
require(`./lib/mongoose-setup`);

const server = http.createServer(app);

server.listen(port, function() {
  `Server listening on ${server.address}`;
});

module.exports = server;