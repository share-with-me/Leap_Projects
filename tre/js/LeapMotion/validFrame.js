function validFrame(frame,range,fingersRequired){

	var isHandsValid = validHands(frame.hands.length);
	var isFingersValid = validFingers(frame.pointables.length,fingersRequired);
	
	if(frame.hands[0]!=undefined){
		var isValidLeftRight = validLeftRightPosition(frame.hands[0].palmPosition[0],range);
		var isValidUpDown = validUpDownPosition(frame.hands[0].palmPosition[1],range);
		var isValidFowardBackward = validForwardBackwardPosition(frame.hands[0].palmPosition[2],range);
	}
	
	if(isHandsValid==1 && isFingersValid==1 && isValidLeftRight==1 && isValidUpDown==1 && isValidFowardBackward==1){
		return true;
	}else{
		return false;
	}
}

function validHands(handsDetected){
	if(handsDetected==1){
		return 1;
	}else if(handsDetected>1){
		return 2;
	}else if(handsDetected<1){
		return 0;
	}
}

function validFingers(fingersDetected,fingersRequired){
	if(fingersDetected==fingersRequired){
		return 1;
	}else if(fingersDetected>fingersRequired) {
		return 2;
	}else if(fingersDetected< fingersRequired){
		return 0;
	}	
}

function validLeftRightPosition(leftRight,range){
	if(leftRight < (0+range) && leftRight > (0-range)){
		return 1;
	}else if(leftRight<(0-range)){
		return 0;
	}else if(leftRight>(0+range)){
		return 2;
	}
}

function validUpDownPosition(upDown,range){
	if(upDown < (100+range) && upDown > (100-range)){
		return 1;
	}else if(upDown< (100-range)){
		return 0;
	}else if(upDown> (100+range)){
		return 2;
	}
}
	
	
function validForwardBackwardPosition(forwardBackward,range){
	if(forwardBackward < (0+range) && forwardBackward > (0-range)){
		return 1;
	}else if(forwardBackward>(0+range)){
		return 2;
	}else if(forwardBackward< (0-range)){
		return 0;
	}
}
