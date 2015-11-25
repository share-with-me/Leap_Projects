function extractData(frames){
	
	var fingerPositions = Array(
		Array( //Finger 0
			Array(),	//finger x
			Array(),	//finger y
			Array(),	//finger z
			Array(),	//velocity
			Array()		//timestamp
		),
		Array( //Finger 1
			Array(),	//finger x
			Array(),	//finger y
			Array(),	//finger z
			Array(),	//velocity
			Array()		//timestamp
		),
		Array( //Finger 2
			Array(),	//finger x
			Array(),	//finger y
			Array(),	//finger z
			Array(),	//velocity
			Array()		//timestamp
		),
		Array( //Finger 3
			Array(),	//finger x
			Array(),	//finger y
			Array(),	//finger z
			Array(),	//velocity
			Array()		//timestampc
		),
		Array( //Finger 4
			Array(),	//finger x
			Array(),	//finger y
			Array(),	//finger z
			Array(),	//velocity
			Array()		//timestamp
		)
	);

	for(var i=0;i<frames.length;i++){	//looping through all the frames
		
		for(var x=0;x<frames[i].pointables.length;x++){	//looping through each of the fingers

			for(var z=0;z<frames[i].pointables[x].tipPosition.length;z++){	//Looping through tip X, Y, Z coordinates of the finger

				fingerPositions[x][z].push(parseFloat(frames[i].pointables[x].tipPosition[z].toFixed(2))); //Pushing the position in to the position array
				//The values are all rounded to one decimal place to reduce variance in results
				
			}
			
			fingerPositions[x][3].push(parseFloat(frames[i].pointables[x].tipVelocity[1].toFixed(1)));
			fingerPositions[x][4].push(frames[i].timestamp);
		}
	}
	return fingerPositions;
}
