// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

var isPlayed = false;
var dataNext;
var dataPause;

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Instantiate our SerialPort object
    serial = new p5.SerialPort();

    // Get a list the ports available
    // You should have a callback defined to see the results
    serial.list();

    // Assuming our Arduino is connected, let's open the connection to it
    // Change this to the name of your arduino's serial port
    serial.open("/dev/cu.wchusbserialfa130");

    // Here are the callbacks that you can register

    // When we connect to the underlying server
    serial.on('connected', serverConnected);

    // When we get a list of serial ports that are available
    serial.on('list', gotList);
    // OR
    //serial.onList(gotList);

    // When we some data from the serial port

    serial.on('data', gotData);
    // OR
    //serial.onData(gotData);

    // When or if we get an error
    serial.on('error', gotError);
    // OR
    //serial.onError(gotError);

    // When our serial port is opened and ready for read/write
    serial.on('open', gotOpen);
    // OR
    //serial.onOpen(gotOpen);

    // Callback to get the raw data, as it comes in for handling yourself
    //serial.on('rawdata', gotRawData);
    // OR
    //serial.onRawData(gotRawData);
    //  song = loadSound('assets/naturesound.mp3');


}

// We are connected and ready to go
function serverConnected() {
    println("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
    println("List of Serial Ports:");
    // theList is an array of their names
    for (var i = 0; i < thelist.length; i++) {
        // Display in the console
        println(i + " " + thelist[i]);
    }
}

// Connected to our serial device
function gotOpen() {
    println("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
    println(theerror);
}

// There is data available to work with from the serial port
function gotData() {
    var currentString = serial.readLine(); // read the incoming string
    trim(currentString); // remove any trailing whitespace
    if (!currentString) return; // if the string is empty, do no more
    console.log(currentString); // println the string
    latestData = currentString; // save it for the draw method
    var data = latestData.split(',');
    dataNext = data[0];
    dataPause = data[1];
    println(dataNext, "  ..... ", dataPause);

}

// We got raw from the serial port
function gotRawData(thedata) {
    println("gotRawData" + thedata);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device



function draw() {
    background(255, 255, 255);
    fill(0, 0, 0);
    text(latestData, 10, 10);

    Play();
    // Polling method
    /*
  if (serial.available() > 0) {
  var data = serial.read();
  ellipse(50,50,data,data);
}
*/


}

//var audio = new Audio('try.mp3');
//var audio2 = new Audio('naturesound.mp3');
var audioArray = [];
audioArray[0] = new Audio('try.mp3');
audioArray[1] = new Audio('try1.mp3');
audioArray[2] = new Audio('try2.mp3');
audioArray[3] = new Audio('try3.mp3');
audioArray[4] = new Audio('try4.mp3');
audioArray[5] = new Audio('try5.mp3');
audioArray[6] = new Audio('try6.mp3');
audioArray[7] = new Audio('try7.mp3');
audioArray[8] = new Audio('try8.mp3');
audioArray[9] = new Audio('try9.mp3');

var count = 0;

function Play() {
    if (dataPause > 0) {

        audioArray[count].play();
    } else {

        audioArray[count].pause();
        //audio.currentTime = 0;
    }
    if (dataNext > 1.5) {
        audioArray[count].pause();
        audioArray[count].currentTime = 0;
        ++count;
        //audioArray[1].play();
        console.log(count + "----");
        println("count= " + count);
        if (count == 9) {
            count = 0;
        }
    }
}