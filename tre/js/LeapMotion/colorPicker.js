function colorPickerFromEuclidean(distance){
	
	var localDistance = distance;	//creates a local variable of the distance
	
	localDistance = parseInt((localDistance/100)*255);	//converts the local distance to a value between 0 and 255
	
	if(localDistance>255){	//If the number is greater than 255
		localDistance=255
	}
	if(localDistance<0){	//if its less than 0
		localDistance = 0;
	}
	
	var r = 0 + localDistance;	//make the r value bigger as we move further away from the desired location
	var g = 255 - localDistance; //makes the g value smaller as you move further away from the desired location
	var b = 0;	//not modified
	
	return "rgba("+r+","+g+","+b+",1)"; //CSS rgba color
}
