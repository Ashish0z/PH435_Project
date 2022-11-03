const { Accelerometer, Board } = require("johnny-five");
const board = new Board({port: "COM6"});

const { spawn } = require('node:child_process');

msg = "";

board.on("ready", () => {
  const accelerometer = new Accelerometer({
    controller: "MPU6050"
  });

  accelerometer.on("change", () => {
    const {acceleration, inclination, orientation, pitch, roll, x, y, z} = accelerometer;
    //console.log("Accelerometer:");
    //console.log("  x            : ", x);
    //console.log("  y            : ", y);
    //console.log("  z            : ", z);
    //console.log("  pitch        : ", pitch);
    //console.log("  roll         : ", roll);
    //console.log("  acceleration : ", acceleration);
    //console.log("  inclination  : ", inclination);
    //console.log("  orientation  : ", orientation);
    //console.log("--------------------------------------");
    var cm = 'nrm';
    if ( x > 0.7) cm= 'r';
    else if ( x < -0.6) cm= 'l';
    else if ( y > 0.7) cm= 'u';
    else if ( y < -0.4) cm= 'd';
    else cm = '';
    msg += cm;
    //console.log(msg);
    if (msg.length > 15) {
        const ls = spawn('python', ['mouse_ctrl.py', msg]);
        ls.on('close', (code) => {
            ///console.log(`child process exited with code ${code}`);
        });
        
        msg = "";
      //msg = msg.slice(-5);
    }
    
    /*var msg = "<li> pitch: " + pitch + 
              "</li> <li> roll: " + roll + 
              "</li> <li> x: " + x + 
              "</li> <li> y: " + y + 
              "</li> <li> z: " + z + 
              "</li> <li> cm: " + cm + "</li>";*/
  });
});
