const http = require("http");
const app = require("./backend/app");

port = process.env.port || 3000;

app.set("port", port);

const server = http.createServer(app);
// app.use((res, req) => {
//   console.log("End of server");
// });
server.listen(3000);
