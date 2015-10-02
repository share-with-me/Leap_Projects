(function(){
  // get the canvas, 2d context, paragraph for data and set the radius
  var canvas = document.getElementsByTagName('canvas')[0],
      ctx = canvas.getContext('2d'),
      lastPosition, pointableId;

  // set the canvas to cover the screen
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  // move the context co-ordinates to the bottom middle of the screen
  ctx.translate(canvas.width/2, canvas.height);

  ctx.strokeStyle = "rgba(255,0,0,0.9)";
  ctx.lineWidth = 2;

  function draw(frame){
    
    var pointable, currentPosition, i, len;
    if(pointableId !== undefined){
      // we have a current pointableId, so we should look for it in this frame
      pointable = frame.pointable(pointableId);
      // if the pointable is valid, i.e. it is still in the frame
      if(pointable.valid){
        // we take the position of its tip
        currentPosition = pointable.tipPosition;
        // and if it is closer to the screen than the device
        if(currentPosition.z < 0){
          // we draw a line between the current position and the previous one
          ctx.beginPath();
          ctx.moveTo(lastPosition.x, -lastPosition.y);
          ctx.lineTo(currentPosition.x, -currentPosition.y);
          ctx.stroke();
        }
        // finally, we update the last position
        lastPosition = currentPosition;
      }else{
        // the pointable is not valid, let's find a new one.
        pointableId = undefined;
        lastPosition = undefined;
      }
    }else{
      // we do not have a pointable right now so we should look for one
      if(frame.pointables.length > 0){
        // if the frame has some pointables in it, we choose the first one
        pointable = frame.pointables[0];
        pointableId = pointable.id;
        lastPosition = pointable.tipPosition;
      }
     
  
    }
}

  // we have to enable gestures so that the device knows to send them through the websocket
  Leap.loop({ enableGestures: true }, draw);
})();

