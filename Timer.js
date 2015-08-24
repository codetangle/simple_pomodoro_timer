var Timer = function(timeInSeconds) {
	this.startingTime = timeInSeconds;
	this.remainingTime = timeInSeconds;
	this.intervalId = 0;
	this.countingDown = false;
}

// Format this.remainingTime (in seconds) to HH:MM:SS
Timer.prototype.formatTime = function() {
	var seconds = this.remainingTime;
	var minutes = 0;
	var hours = 0;

	// If the number is less than 10 prepend with a zero placeholder
	var addZero = function(number) {
		if(number < 10) {
			return "0" + number;
		} else {
			return number;
		}
	};
	// Calculate seconds
	if (seconds >= 60) {
		minutes = Math.floor(seconds/60);
		seconds = seconds % 60;
	}
	// Calculate minutes
	if (minutes >= 60) {
		hours = Math.floor(minutes/60);
		minutes = minutes % 60;
	}
	return addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
};

// Adds timeRemaining to the page
Timer.prototype.addTime = function() {
	document.getElementById('time_remaining').innerHTML = this.formatTime();
};

// Decrement the amount of time remaining
Timer.prototype.tick = function() {
	this.remainingTime -= 1;
};

// Statrt the timer
Timer.prototype.start = function() {
	// Allow the counter to run
	this.countingDown = true;
	var thisClock = this;
	this.intervalId = setInterval(function() {
		thisClock.updateTime();
	}, 1000);
	console.log(this.intervalId);
};

// Stop the timer
Timer.prototype.stop = function(intervalId) {
	clearInterval(intervalId);
	this.countingDown = false;
};

// Reset thet timer to it's original time
Timer.prototype.reset = function(intervalId) {
	this.stop(intervalId);
	this.remainingTime = this.startingTime;
	// Add the new time to the document
	this.addTime();
};

// This function runs the timer
Timer.prototype.updateTime = function() {
	if(this.countingDown){
		this.tick();
		this.addTime();
	}

}

// Initialize a new Timer
var clock = new Timer(12045);
clock.addTime();

// Tell the counter to count down
clock.start();

setTimeout(function() {
	console.log('7 seconds have passed');
	clock.stop();
}, 7000);

setTimeout(function() {
	console.log('11 seconds have passed');
	clock.reset();
}, 11000);
// setTimeout(function(){
// 	console.log('Timeout function 1');
// 	clock.updateTime();
// }, 1000);

