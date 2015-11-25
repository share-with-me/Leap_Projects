
var controller = new Leap.Controller();

$(document).ready(function() {
	//This makes the initial connection with the lmDevice
	//Nothing will happen if this is not called
	controller.connect();	
});

//This event fires when a successful connection has been made with the lmDevice
controller.on('connect', function() {
	
});

//This is fired when the script is already running and the lmDevice is then connected
controller.on('deviceConnected', function() {
	
});

//This is fired when the script is running and the lmDevice is disconnected
controller.on('deviceDisconnected', function() {
	
});

//This is fired at 60 frames per second no matter what
//If there is no new data for the frame, the previous frames data is sent
//'frame' can also be 'animationFrame'
controller.on('frame', function(frame) {
	frameController(frame);
});
