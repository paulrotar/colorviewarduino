//Import the library serialport
var serialport = require('serialport');

//Set the name of the port Arduino is connected to
//To find this, run in Terminal:
//		ls /dev/tty.*
var portName = 'COM3';

//Create a new object to collect the information
var sp = new serialport(portName, {
    baudRate: 9600,
    parser: serialport.parsers.readline("\r\n")
});

//Create a new function, that outputs the content
//that is sent from Arduino
sp.on('data', function(input) {
    console.log(input);
});