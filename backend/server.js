const http = require('http');
// const path = require("path");
require('dotenv').config();
// path.resolve(process.cwd(), ".env");

const app = require('./app');

port = process.env.port || process.env.API_PORT;

app.set('port', port);

const server = http.createServer(app);
// app.use((res, req) => {
//   console.log("End of server");
// });
server.listen(3000);
