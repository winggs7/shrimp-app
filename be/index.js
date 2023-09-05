const express = require("express");
const app = express();
var http = require("http").createServer(app);
var cors = require("cors");
require("dotenv").config();
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

var PORT = +process.env.PORT || 7000;

const parser = require("./config/serial");
const socketFunction = require("./config/socket");
const connection = require("./config/dbconnection");
const userRouter = require("./routers/user");
const pondRouter = require("./routers/pond");
const cropRouter = require("./routers/crop");
const statRouter = require("./routers/stat");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

connection.connect((err) => {
  if (err) throw err;
  console.log("DB connected!");
});

socketFunction(io);

app.use("/user", userRouter);
app.use("/pond", pondRouter);
app.use("/crop", cropRouter);
app.use("/stat", statRouter);

http.listen(PORT, () => {
  var port = http.address().port;
  console.log("App listening at port: ", port);
});
