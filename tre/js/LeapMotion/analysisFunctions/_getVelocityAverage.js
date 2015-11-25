/*
	* Created By		-	Joshua Stopper
	* Last Edited Date	-	15/10/13
	* Last Edited By	- 	Joshua Stopper
	* Description		-	Calculates the average velocity and returns a value
	* Notes				-	http://formulas.tutorvista.com/physics/average-velocity-formula.html
*/


function getVelocityAverage(positionAr,timestamps){

	var velocityAr = new Array();	//Initializing an array to hold the accelerations
	
	for(var i=0;i<positionAr.length;i++){	//Looping over all the velocities in the array
		
		if(positionAr[i+1]!=undefined){	//If the current index + 1 does not equal undefined (if it is undefined there is no next value to calculate with)
			var velocityChange = positionAr[i+1] - positionAr[i];	//get the next velocity minus the current velocity
			var timeChange = timestamps[i+1] - timestamps[i];	//Get the next time minus the current time
	
			velocityAr.push(velocityChange / timeChange);	//divide velocity by time
		}
		
	}

	var velocityTotal = 0;

	for(var i=0;i<velocityAr.length;i++){
		velocityTotal = velocityTotal + velocityAr[i];
	}

	return velocityTotal/velocityAr.length;

}
