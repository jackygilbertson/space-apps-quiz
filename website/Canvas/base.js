Game = function(){
	canvas.width = 600;
	canvas.height = 600;
	this.images = {};
}

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

window.addEventListener('resize', doResize, false);

function doResize() { 
	canvas.width = document.body.clientWidth; 
	canvas.height = document.body.clientHeight;
}

Game.prototype.ImageLoader = function(callback){
	
	this.sources = {
	        bg: "i/spacebg.png"
	 };
	
	var loadedImages = 0;
    var numImages = 0;
	for (var src in this.sources) {
        numImages++;
    }
	
	for (var src in this.sources) {
		this.images[src] = new Image();
		
		this.images[src].onload = function(){
            if (++loadedImages >= numImages) {
                callback();
            }
        };
		this.images[src].src = this.sources[src];
	}
};
    
Game.prototype.update = function(){
    //console.log("update")   
}
    
Game.prototype.render= function(){
    console.log("render")
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#000";
	context.fillRect(0, 0, canvas.width, canvas.height);  
	
	for (var i=0; i<3; i++) {
		for (var j=0; j<3; j++) {
		context.drawImage(this.images['bg'], i*600, j*600); 
		}
	};
	
}

Game.prototype.loop = function(){
	this.update();
	this.render();
};

Game.prototype.run = function() {
    var currentGame = this;
	doResize();
	
	this.ImageLoader(function(){
		console.log("images loaded");
	});

	(function animloop(){
	      requestAnimFrame(animloop);
	      currentGame.loop();
	 })();
};

var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
document.body.appendChild(canvas);
myGame = new Game();

myGame.run();