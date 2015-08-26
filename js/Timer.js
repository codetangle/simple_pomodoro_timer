// The Timer class definition
// @param timeInSeconds - The time in seconds that the timer with run
// @param zeroFunction - A function that runs when the time hits zero.
var Timer = function(timeInSeconds, zeroFunction) {
	// The amount of time the timer will count down, must be in seconds,
	// and must be an integer
	this.startingTime = timeInSeconds;
	// The amount of time left on the clock
	this.remainingTime = timeInSeconds;
	// The function to run when the timer reaches zero
	this.zeroFunction = zeroFunction;
	// The id of the setInterval function so we can stop and start it again
	this.intervalId = 0;
	// True if the clock should be counting down, false otherwise.
	this.countingDown = false;
}

// Function to run when timer reaches zero
Timer.prototype.zeroFunction = this.zeroFunction;

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

	// Find the number of minutes
	if (seconds >= 60) {
		minutes = Math.floor(seconds/60);
		seconds = seconds % 60;
	}
	// Calculate the number of hours
	if (minutes >= 60) {
		hours = Math.floor(minutes/60);
		minutes = minutes % 60;
	}
	return addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
};

// Adds timeRemaining to the page
Timer.prototype.addTimer = function() {
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
};

// Stop the timer
Timer.prototype.stop = function() {
	clearInterval(this.intervalId);
	this.countingDown = false;
};

// Reset thet timer to it's original time
Timer.prototype.reset = function() {
	this.stop();
	this.remainingTime = this.startingTime;
	// Add the new time to the document
	this.addTimer();
};

// This function updates timeRemaining and adds the new time to the page
Timer.prototype.updateTime = function() {
	if(this.remainingTime <= 0) {
		this.stop();
		this.zeroFunction();
	}
	if(this.countingDown){
		this.tick();
		this.addTimer();
	}
}