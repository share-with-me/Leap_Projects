var recording = false;	//Defines whether or not the system is recording frames
var recordedFrames = Array();	//Stores the recorded frames for the current recording
var preRecordFrames = Array();

var timeRequired = 2;	//The amount of time valid frames are recorded for
var rangeMultiplier = 5;	//A multiplier for the range of field values that are acceptable, multiplies a value of 20
var baseRangeVariance = 10;
var fingersRequired = 5;	//THe amounf of fingers required to be in the frame

var WFLC_apply = 0;	// apply Weighted Fourier Linear Combined filter algorithm

$( document ).ready(function() {	//When the document loads this function is called
	$('#introModal').modal({	//Opens the modal dialog box
		keyboard:false,	//Makes the keyboard inputs not close the modal box
		backdrop:'static'	//Makes mouse clicks outside the modal not close the dialog box
	});
});

$(".beginRecording").click(function(){	//When the begin recording button is clicked
	recording=true;	//Sets recording to true
	recordedFrames = Array();	//empties the recorded frames array so all old entries are removed
	preRecordFrames = Array();	//empties the preRecorded frames array so all old entries are removed
});


function frameController(frame){	//Looping through every frame passed from the leap motion controller

	if(recording){	//if the system is currently recording frames
	
		displayHandsFingers(frame);	//Displaying the hands on the screen
		displayInfo(frame,fingersRequired);	//Displaying info about the hands on the screen
			
		if(validFrame(frame,(rangeMultiplier*baseRangeVariance),fingersRequired)){	//frame is valid
			
			if(preRecordFrames.length==60){	// if 1 second of valid frames has been recorded
				
				recordedFrames.push(frame);	//Pushing the current frame into the recordedFrames array

				if(recordedFrames.length==(timeRequired*60)){	//If the time required has been reached

					var extractedData = extractData(recordedFrames);	//extract the data from the frames recorded and stores them in extractedData	
					console.log(extractedData)
					updateResultsModal(extractedData);	//updating the data in the final results model - this also analyses the frames
				
					$('#resultsModal').modal({	//Opening the modal
						keyboard:false,	//Making the keyboard not close the modal
						backdrop:'static'	//making mouse clicks outside the modal not close the modal
					});
					recording = false;	//Setting recording to false so no more frames are recorded
				}
				
			}else{
				preRecordFrames.push(frame);	//Pushing a frame in to the prerecorded array
			}
			
		}else{	//frame is not valid
			recordedFrames = Array();	//Clearing the recordedFrames array
			preRecordFrames = Array();	//Clearing the preRecord array
		}
	}
}

/*
	* Outputs the final results to the modal dialog box
	* takes on parameter which is extracted data from the recorded frames
*/
function updateResultsModal(data_set){
	var output = "";
	
	for(var i=0;i<data_set.length;i++){
		
		output+="<div class='well'>";
		output+="Finger "+(i+1)+"<br><br>";
		output+="Y Hertz: "+getFrequency(data_set[i][1])+" Hz<br>";
		output+="Y Amplitude: "+getAmplitude(data_set[i][1])+" mm<br>";
		output+="Y Velocity: "+getVelocityAverage(data_set[i][1],data_set[i][4])+" mm/s<br>";
		output+="Y Acceleration: "+getAccelerationAverage(data_set[i][3],data_set[i][4])+" mm/s&sup2;<br>";
		output+="</div>";
		
	}
	
	$("#resultsModal .modal-body").html(output);
}

function displayInfo(frame,fingersRequired){

	var handsDetected = validHands(frame.hands.length);
	var fingersDetected = validFingers(frame.pointables.length,fingersRequired);
	
	var leftRight = null;
	var upDown = null;
	var forwardBackward = null;
	
	var positionText = "";
	
	if(frame.hands[0]!=undefined){
		leftRight = validLeftRightPosition(frame.hands[0].palmPosition[0],(rangeMultiplier*baseRangeVariance));
		upDown = validUpDownPosition(frame.hands[0].palmPosition[1],(rangeMultiplier*baseRangeVariance));
		forwardBackward = validForwardBackwardPosition(frame.hands[0].palmPosition[2],(rangeMultiplier*baseRangeVariance));
	}

	var handsDetectedMessage;
	var fingersDetectedMessage;
	var leftRightMessage;
	var upDownMessage;
	var forwardBackwardMessage;
	var leftRightMessage_error = "";
	if(leftRight==1){
		leftRightMessage_error = "text-success";
		leftRightMessage = "Good Position";
	}else if(leftRight==2){
		leftRightMessage_error = "text-danger";
		leftRightMessage = "Too far right";
	}else if(leftRight==0){
		leftRightMessage_error = "text-danger";
		leftRightMessage = "Too far left";
	}else{
		leftRightMessage = "No Data Available";
	}
	
	var leftRightMessage_div = "<div class='well " + leftRightMessage_error + "'><h5>Left/Right: </h5>"+ leftRightMessage+"</div>";
	
	var upDownMessage_error = "";
	if(upDown==1){
		upDownMessage_error = "text-success";
		upDownMessage = "Good Position";
	}else if(upDown==2){
		upDownMessage_error = "text-danger";
		upDownMessage = "Too High";
	}else if(upDown==0){
		upDownMessage_error = "text-danger";
		upDownMessage = "Too Low";
	}else{
		upDownMessage = "No Data Available";
	}
	
	var upDownMessage_div = "<div class='well " + upDownMessage_error + "'><h5>Up/Down: </h5>"+ upDownMessage+"</div>";
	$("#infoPanel > div:first-child").html("");
	$("#infoPanel > div:first-child").append(positionText);
	
	var progress = parseInt((recordedFrames.length/(timeRequired*60)*100));
	$("#infoPanel > div:first-child").append("<div class='well'><h5>Progress</h5><div class='progress'><div class='progress-bar' role='progressbar' aria-valuenow='"+progress+"' aria-valuemin='0' aria-valuemax='100' style='background-color: black;width: "+progress+"%;'><span class='sr-only'>"+progress+"% Complete</span></div></div></div>");
	$("#infoPanel > div:first-child").append(leftRightMessage_div);
	$("#infoPanel > div:first-child").append(upDownMessage_div);
}
