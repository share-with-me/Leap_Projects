
var fingers = {};	//An array of virtual fingers currently in the system
var spheres = {};	//An arrat of virtual hands currently in the system

function displayHandsFingers(frame){
	var fingerIds = {};	//An array of finger IDS passed from the leap controller
	var handIds = {};	//An array of hand IDS passed from the leap controller
	if (frame.hands === undefined ) {	//Testing if their are hands in the current frame
		var handsLength = 0	//Setting the handslength variable to 0 if there are none
	} else {
		var handsLength = frame.hands.length;	//Setting the handslength variable to the amount of hands detected
	}

	var euclideanColor;

	for (var handId = 0, handCount = handsLength; handId != handCount; handId++) { //Setting the hand iterator to 0, setting the hand count to handslength, while hand Id does not equal hand count, handID++
		var hand = frame.hands[handId];	//Setting hand to the current hand ID
		var posX = (hand.palmPosition[0]*3);	//Multiplying the current hand X position by 3
		var posY = (hand.palmPosition[2]*3)-200;	//Multiplying the current hand Y position by 3 - 200
		var posZ = (hand.palmPosition[1]*3)-400;	//Multiplying the current hand Z position by 3 - 400
		var rotX = (hand._rotation[2]*90);	//Multiplying the hand X rotation by 90
		var rotY = (hand._rotation[1]*90);	//Multiplying the hand Y rotation by 90
		var rotZ = (hand._rotation[0]*90);	//Multiplying the hand Z rotation by 90

		euclideanColor = colorPickerFromEuclidean(parseInt(get3dEuclidean(hand.palmPosition[0],0,hand.palmPosition[1],100,hand.palmPosition[2],0)))	
		var sphere = spheres[hand.id];	//Get the current hand(sphere) from the spheres array and store it as the current sphere
		
		if (!sphere) {	//If sphere is not equal to true - this is a new sqhere
			var sphereDiv = document.getElementById("sphere").cloneNode(true);	//Clone the sphere element from the dom and store it as sphereDiv
			sphereDiv.setAttribute('id',hand.id);	//set the sphereDiv id to the current handID
			
			
			//sphereDiv.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16);	//Create a random color for the sphere
			sphereDiv.style.backgroundColor=euclideanColor;	//Create a color based on distance from correct spot
			
			document.getElementById('scene').appendChild(sphereDiv);	//Add the new element(sphereDiv) to the Dom element scene
			spheres[hand.id] = hand.id;	//Push the hand id into the spheres array to detect for next frame
		} else {	//The hand is detected in the array
			var sphereDiv =  document.getElementById(hand.id);	//get the hand element from the dom
			if (typeof(sphereDiv) != 'undefined' && sphereDiv != null) {	//Sanity checking to make sure the sphereDiv is a sphereDiv and not null
				
				sphereDiv.style.backgroundColor=euclideanColor;	//Create a color based on distance from correct spot
				
				moveSphere(sphereDiv, posX, posY, posZ, rotX, rotY, rotZ);	//Calling the move sphere function with the current position
			}
		}
		handIds[hand.id] = true;	//Setting the current handID in the handsID array to be true - so the program knows if to delete or not
	}
	
	for (handId in spheres) {	//Looping through all the objects(handIDs) in the spheres array
		if (!handIds[handId]) {	//If the handId node is not set to true - delete it from the scene
			var sphereDiv =  document.getElementById(spheres[handId]);	//Getting the element from the dom
			sphereDiv.parentNode.removeChild(sphereDiv);	//Deleting the element from the dom
			delete spheres[handId];	//removing the node from the array
		}
	}

	for (var pointableId = 0, pointableCount = frame.pointables.length; pointableId != pointableCount; pointableId++) {	//pointableID iterator = 0, pointableCount = amount of pointbles detected in the frame,looping through all the pointables detected; increasing the pointable iterator
		var pointable = frame.pointables[pointableId];	//setting pointable to the current pointable
		var posX = (pointable.tipPosition[0]*3);	//multiplying the current pointable position by 3
		var posY = (pointable.tipPosition[2]*3)-200;	//Multiplying the current pointable Y position by 3 - 200
		var posZ = (pointable.tipPosition[1]*3)-400;	//Multiplying the current pointable Z position by 3 - 400
		var dirX = -(pointable.direction[1]*90);	//Multiplying the pointable X direction by 90
		var dirY = -(pointable.direction[2]*90);	//Multiplying the pointable Y direction by 90
		var dirZ = (pointable.direction[0]*90);	//Multiplying the pointable Z direction by 90

		var finger = fingers[pointable.id];	//setting finger to the current finger stored in the fingers array
		
		if (!finger) {	//if finger is not set to true - finger does not exist
			var fingerDiv = document.getElementById("finger").cloneNode(true);	//clone the finger element from the dom
			fingerDiv.setAttribute('id',pointable.id);	//set the new finger iD
			
			//fingerDiv.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16);	//create a random color for the finger
			fingerDiv.style.backgroundColor=euclideanColor;	//create a random color for the finger
			
			document.getElementById('scene').appendChild(fingerDiv);	//adding the new finger to the dom
			fingers[pointable.id] = pointable.id;	//adding the finger id to the finger array
		} else {	//finger is set to true - finger already exists
			var fingerDiv =  document.getElementById(pointable.id);	//get the finger from the dom
			if (typeof(fingerDiv) != 'undefined' && fingerDiv != null) {	//sanity checking to make sure finger was retrieved
			
				fingerDiv.style.backgroundColor=euclideanColor;	//create a random color for the finger
			
				moveFinger(fingerDiv, posX, posY, posZ, dirX, dirY, dirZ);	//updating the position of the finger on the screen
			}
		}
		fingerIds[pointable.id] = true;	//Setting the current finger id to true in the fingerIDs array so its not deleted
	}
	for (fingerId in fingers) {	//looping through all fingers in the array
		if (!fingerIds[fingerId]) {	//If the finger id from the current frame is not in the global fingers array
			var fingerDiv =  document.getElementById(fingers[fingerId]);	//get the finger element from the dom
			fingerDiv.parentNode.removeChild(fingerDiv);	//delete the ginger element from the dom
			delete fingers[fingerId];	//removing the finger from the array
		}
	}	
}

//Moves the fingers into the correct position for the current frame
//Parameters
/*
	Finger id
	Base X position
	Base Y POsition
	Base Z position
	X pointing direction
	Y pointing direction
	Z pointing direction
*/
function moveFinger(Finger, posX, posY, posZ, dirX, dirY, dirZ) {
	Finger.style.webkitTransform = "translateX("+posX+"px) translateY("+posY+"px) translateZ("+posZ+"px) rotateX("+dirX+"deg) rotateY(0deg) rotateZ("+dirZ+"deg)";
}
//Moves the palm object into the correct position for the current frame
//Parameters
/*
	Finger id
	Base X position
	Base Y POsition
	Base Z position
	X rotation
	Y rotation
	Z rotation
*/
function moveSphere(Sphere, posX, posY, posZ, rotX, rotY, rotZ) {
	Sphere.style.webkitTransform = "translateX("+posX+"px) translateY("+posY+"px) translateZ("+posZ+"px) rotateX("+rotX+"deg) rotateY(0deg) rotateZ(0deg)";
}
