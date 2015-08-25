var timerModels = {
	timesUp: function() {
		alert('Your time has come to an end');
	},
	clock25: new Timer(1500, this.timesUp),
	clock5: new Timer(300, this.timesUp)
};
var pomodoroTimers = {
	init: function() {
		pomodoroTimers.currentTimer.addTime();
		controlButtonsView.render();
		timerButtonsView.render();
	},
	currentTimer: timerModels.clock25
};

var controlButtonModels = {
	buttons: [
		['buttonController.start()', 'Start'],
		['buttonController.stop()', 'Stop'],
		['buttonController.reset()', 'Reset']
	]
};

var controlButtonsView = {
	render: function() {
		var buttonContainer = document.getElementById('control_buttons');
		var i = 0;
		console.log(controlButtonModels.buttons);
		var buttonList = controlButtonModels.buttons
		var l = buttonList.length;
		for(i = 0; i < l; i++) {
			this.addButton(buttonContainer, buttonList[i]);
		}
	},
	addButton: function(domElement, buttonArray) {
		var button = document.createElement('BUTTON');
		button.setAttribute('type', 'button');
		button.setAttribute('onClick', buttonArray[0]);
		var buttonName = document.createTextNode(buttonArray[1]);
		button.appendChild(buttonName);
		domElement.appendChild(button);
	}
};

var timerButtonsView = {
	render: function() {}
};

var buttonController = {
	stop: function() {
		pomodoroTimers.currentTimer.stop();
	},
	start: function() {
		pomodoroTimers.currentTimer.start();
	},
	reset: function() {
		pomodoroTimers.currentTimer.reset();
	}
};

pomodoroTimers.init();

// controlButtonsView.render();
// pomodoroTimers.currentTimer.addTime();