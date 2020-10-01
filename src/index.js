import React from "react";
import { setGlobal, addCallback } from 'reactn';
import ReactDOM from "react-dom";
import App from './App.js'
import ErrorBoundary from './components/ErrorBoundary.js';

var oldState = {};

// Every time the global state changes, this function will run.
addCallback(globalState => {
	// Get a diff of two JS objects in order to avoid logging the whole state
	let stateDiff = Object.keys(globalState).reduce((diff, key) => {
		if (oldState[key] === globalState[key]) return diff
		return {
			...diff,
			[key]: globalState[key]
		}
	}, {});
	console.log(`Global state diff/change(s):`);
	console.log(stateDiff);
	// console.log(globalState);
	oldState = globalState;
	// Always have only 1 instance running
	if (globalState.instances != 1) {
		return { instances: 1 };
1	} else {
		// Don't change the state
		return null;
	}
});
 
setGlobal({
	running: true,
	instances: 0,
	poseDetectionEnabled: true,
	faceRecognitionEnabled: false
});

ReactDOM.render(<ErrorBoundary>
					<App name="cv.tools"/>
				</ErrorBoundary>, document.getElementById("root"));