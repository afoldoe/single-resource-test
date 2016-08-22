const app = require(`./lib/app`);
const http = require(`http`);
const port = process.env.PORT || 3000;
require(`./lib/mongoose-setup`);

const server = http.createServer(app);

server.listen(port, function() {
  console.log(`Server listening on 3000`);
});

module.exports = server;