const { Accelerometer, Board } = require("johnny-five");
const board = new Board({port: "COM6"});

var express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use("/static", express.static('static'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

board.on("ready", () => {
  const accelerometer = new Accelerometer({
    controller: "MPU6050"
  });

  accelerometer.on("change", () => {
    const {acceleration, inclination, orientation, pitch, roll, x, y, z} = accelerometer;
    var cm = 'nrm';
    if ( x > 0.7) cm= 'r';
    else if ( x < -0.6) cm= 'l';
    else if ( y > 0.7) cm= 'd';
    else if ( y < -0.4) cm= 'u';
    else cm = 'nrm';
    var msg = cm;
    io.emit('mpu_msg', msg);
  });
});