const parser = require("./serial");
const { SerialPort } = require("serialport");

const socketFunction = (io) => {
  io.on("connection", (client) => {
    console.log("Socket on!");

    client.on("init_tracking", (list_cropIds) => {
      list_cropIds.forEach((crop_id) => client.join(crop_id));
    });

    client.on("create_tracking", (crop_id) => {
      client.join(crop_id);
    });

    client.on("get_port_list", () => {
      SerialPort.list().then(function (ports) {
        client.emit("port_list", ports);
      });
    });

    client.on("disconnect", (data) => {
      console.log(io.sockets.adapter.rooms);
    });
  });

  parser.on("data", function (data) {
    const temp = data.trim().split(";");

    const rooms = io.sockets.adapter.rooms;
    for (const [key, value] of rooms) {
      io.to(key).emit(`Temp_${key}`, +temp);
    }
  });
};

module.exports = socketFunction;
