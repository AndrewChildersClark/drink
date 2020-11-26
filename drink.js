const gpio = require('onoff').Gpio;
const relaypin1 = new gpio(12, 'high');
//const relaypin2 = new gpio(x, 'high');
const button = new gpio(18, 'in', 'rising', {debounceTimeout:7});
//const button2 = new gpio(x, 'in', 'rising', {debounceTimeout:7});

var buttonValue = 0;
//var buttonValue2 = 0;

button.watch((err, value) => {
if (err) {
console.error('There was an error', err);
return;
} if (buttonValue < 1) {
buttonValue = buttonValue + 1;
console.log(buttonValue);
relay();
} else {
console.log('button1 has already been pressed');
}
});

/*
button2.watch((err, value) => {
if (err) {
console.error('There was an error with button2', err);
return;
} if (buttonValue2 < 1) {
buttonValue2 = buttonValue2 + 1;
console.log(buttonValue2);
relay2();
} else {
console.log('button2 has already been pressed');
}
});
*/

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

async function relay() {
console.log("Pump on");
relaypin1.writeSync(0);
await sleep(5000);
console.log("Pump off");
relaypin1.writeSync(1);
await sleep(2000);
buttonValue = 0;
}

/*
async function relay2() {
console.log("Pump2 on");
relaypin2.writeSync(0);
await sleep(5000);
console.log("Pump2 off");
relaypin2.writeSync(1);
await sleep(2000);
buttonValue2 = 0;
}
*/


// Handle Ctrl+C exit cleanly
process.on('SIGINT', () => {
  relaypin1.writeSync(1);
  //relaypin2.writeSync(1);
  relaypin1.unexport();
  //relaypin2.unexport();
  button.unexport();
  //button2.unexport();
  process.exit()
});