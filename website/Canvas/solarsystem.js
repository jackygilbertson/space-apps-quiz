var sun = new Image();  
var moon = new Image();  
var earth = new Image();  

window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
})();

function init(){  
  sun.src = 'i/sun.png';  
  moon.src = 'i/moon.png';  
  earth.src = 'i/earth.png'; 

  var currentGame = this;
	
  console.log("hi");
  	(function animloop(){
	      requestAnimFrame(animloop);
	      draw();
	 })(); 
}  
  
function draw() {  
  context.globalCompositeOperation = 'destination-over'; 
  context.clearRect(0,0,canvas.width,canvas.height); // clear canvas  

  context.save();  
  context.translate(150, 150);
     
  // Earth  
  var time = new Date();  
  context.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );  
  context.translate(105, 0);  
  context.drawImage(earth, -12, -12);  
  
  // Moon  
  context.save();  
  context.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );  
  context.translate(0,28.5);  
  context.drawImage(moon,-3.5,-3.5);  
  context.restore();  
  
  context.restore();  
   
  context.drawImage(sun,0,0,300,300);  

  context.fillStyle = 'rgba(0,0,0,1)';  
  context.fillRect(0, 0, canvas.width, canvas.height);

}


var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 600;
canvas.height = 600;

init()