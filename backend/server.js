const http = require('http');
const path = require('path');

require('dotenv').config();
const app = require('./app');

port = process.env.port || process.env.API_PORT;

app.set('port', port);

const server = http.createServer(app);

server.listen(3000);
console.log(port);
