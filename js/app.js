var timerFunctions = {
	// Define functions to run when the 25:00 timer ends
	timesUp25: function() {
		var videoElement = document.getElementById('video_iframe');
		videoElement.src = 'https://youtube.com/embed/V1bFr2SWP1I?autoplay=1';
		//alert('Pom 25 has come to an end');
	},
	// Define functions to run when the 5:00 timer ends
	timesUp5: function() {
		var videoElement = document.getElementById('video_iframe');
		videoElement.src = 'https://youtube.com/embed/0aog7PYkj5w?autoplay=1';
	}
};

var timerModels = {
	// Define your timers here
	clock25: new Timer(1500, timerFunctions.timesUp25),
	clock5: new Timer(300, timerFunctions.timesUp5)
};

var pomodoroTimers = {
	// One function to rule them all
	init: function() {
		this.displayTimer();
		controlButtonsView.render();
		timerButtonsView.render();
	},
	// Keeps track the the timer that is currently running
	currentTimer: timerModels.clock25,
	// A button is created to each timer in the timerList array
	// TODO: create a function that takes each timer from timerModels
	// and put it into an array that is returned to timerList
	timerList: [timerModels.clock25, timerModels.clock5],
	// Load the current timer into the DOM
	displayTimer: function() {
		pomodoroTimers.currentTimer.addTimer();
	}
};

var controlButtonModels = {
	// An array of buttons ['clickAction', 'buttonText']
	buttons: [
		['buttonController.start()', 'Start'],
		['buttonController.stop()', 'Stop'],
		['buttonController.reset()', 'Reset']
	]
};

var controlButtonsView = {
	render: function() {
		// Grabs the page element where the buttons will be stored
		var buttonContainer = document.getElementById('control_buttons');
		var i = 0;
		var buttonList = controlButtonModels.buttons;
		var l = buttonList.length;
		// Loops through each control button
		for(i = 0; i < l; i++) {
			buttonController.addButton(buttonContainer, buttonList[i]);
		}
	}
};

var timerButtonsView = {
	// Load a button for each timer into the DOM
	render: function() {
		// Grabs the page element where the buttons will be stored
		var buttonContainer = document.getElementById('timer_list');
		var i = 0;
		var buttonList = pomodoroTimers.timerList;
		var l = buttonList.length;
		// Loops through each control button
		for(i = 0; i < l; i++) {
			onClickFunction = 'buttonController.loadTimer(pomodoroTimers.timerList[' + i + '])';
			controlButtonArray = [
				onClickFunction,
				buttonList[i].timerName
			];
			buttonController.addButton(buttonContainer, controlButtonArray);
		}
	}
};

// Allows buttons to control the function of timers
var buttonController = {
	stop: function() {
		pomodoroTimers.currentTimer.stop();
	},
	start: function() {
		pomodoroTimers.currentTimer.start();
	},
	reset: function() {
		pomodoroTimers.currentTimer.reset();
	},
	// Allows timer buttons to switch between different timers
	loadTimer: function(timer) {
		pomodoroTimers.currentTimer = timer;
		pomodoroTimers.displayTimer();
	},
	// Adds a button to the DOM
	addButton: function(domElement, buttonArray) {
		// Create the button element that will get added to the page
		var button = document.createElement('BUTTON');
		button.setAttribute('type', 'button');
		button.setAttribute('onClick', buttonArray[0]);
		// Create the text node that will become the button's text
		var buttonName = document.createTextNode(buttonArray[1]);
		button.appendChild(buttonName);
		domElement.appendChild(button);
	}
};

pomodoroTimers.init();