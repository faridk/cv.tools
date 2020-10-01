/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
// DISCLAIMER: This code contains changes. "diff" to see them:
// https://github.com/tensorflow/tfjs-models/tree/master/posenet
import AbstractEngine from './AbstractEngine';
import * as posenet from '@tensorflow-models/posenet';

const flipHorizontal = false; // flip if images are from a webcam

export default class PoseDetectionEngine extends AbstractEngine {
	constructor() {
		super();
		this.state = {
			logFrameTime: true,
			algorithm: 'multi-pose',
			input: {
				mobileNetArchitecture: '0.75', // '1.01', '1.00', '0.75', '0.50'
				// Output stride:  Internally, this parameter affects the height and width of
				// the layers in the neural network. The lower the value of the output stride
				// the higher the accuracy but slower the speed, the higher the value the
				// faster the speed but lower the accuracy.
				outputStride: 16, // 8, 16, 32
				imageScaleFactor: 0.5, // Image scale factor: What to scale the image by before feeding it through the network.
			},
			// Pose confidence: the overall confidence in the estimation of a person's
			// pose (i.e. a person detected in a frame)
			// Min part confidence: the confidence that a particular estimated keypoint
			// position is accurate (i.e. the elbow's position)
			singlePoseDetection: {
				minPoseConfidence: 0.1,
				minPartConfidence: 0.5,
			},
			multiPoseDetection: {
				maxPoseDetections: 5,
				minPoseConfidence: 0.15,
				minPartConfidence: 0.1,
				// nms Radius: controls the minimum distance between poses that are returned
				// defaults to 20, which is probably fine for most use cases
				nmsRadius: 30.0, // 0.0 - 40.0
			},
			output: {
				showSkeleton: true,
				showPoints: true,
				showBoundingBox: false,
			},
			net: null,
		};
	}
	/**
	* Feeds an image to posenet to estimate poses - this is where the magic
	* happens. This function loops with a requestAnimationFrame method.
	*/
	async processFrame() {
		super.processFrame();
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		super.processFrame();
		if (!this.video.paused) {
			let frame = await this.poseDetectionFrame();
			// Cache the frame and attach a timestamp to it
			this.cacher.cacheFrame(frame, this.video.currentTime);
			return true;
			// return this.recognizeFaces();
		} else {
			console.log("Engine is not running!");
			return false;
		}
	}

	async poseDetectionFrame() {
		let poses;
		let minPoseConfidence;
		let minPartConfidence;
		if (this.cache) {
			console.log(`${this.name}: Cached data available`);
		} else {
			if (this.state.logFrameTime) console.time('Frame time');
			// Scale an image down to a certain factor. Too large of an image will slow down the GPU
			const imageScaleFactor = this.state.input.imageScaleFactor;
			const outputStride = +this.state.input.outputStride;
			poses = [];
			switch (this.state.algorithm) {
			case 'single-pose':
				const pose = this.state.net.estimateSinglePose(
				this.video, imageScaleFactor, flipHorizontal, outputStride);
				poses.push(pose);

				minPoseConfidence = +this.state.singlePoseDetection.minPoseConfidence;
				minPartConfidence = +this.state.singlePoseDetection.minPartConfidence;
				break;
			case 'multi-pose':
				poses = await this.state.net.estimateMultiplePoses(
				this.video, imageScaleFactor, flipHorizontal, outputStride,
				this.state.multiPoseDetection.maxPoseDetections,
				this.state.multiPoseDetection.minPartConfidence,
				this.state.multiPoseDetection.nmsRadius);
				minPoseConfidence = +this.state.multiPoseDetection.minPoseConfidence;
				minPartConfidence = +this.state.multiPoseDetection.minPartConfidence;
				break;
			}
		}
		if (this.state.logFrameTime) {
			console.log('Frame time');
		}
		return { poses, minPoseConfidence, minPartConfidence };
	}

	/**
	* Kicks off the demo by loading the posenet model, finding and loading
	* available camera devices, and setting off the detectPoseInRealTime function.
	*/
	async start(name, video, canvas, width, height) {
		await super.start(name, video, canvas, width, height);
		// Load the PoseNet model weights with architecture 0.75
		// const net = await posenet.load(0.75);
		this.state.net = await posenet.load();
		this.video.height = this.height;
		this.video.width = this.width;
		this.newVideo(video);
		// For engineCollector()
		return this;
	}

	/**
	 * Stop engine
	 */
	async stop() {
		await super.stop();
		this.running = false;
		console.log('ENGINE STOPPED!');
	}

	/**
	 * Start processing a new video
	 */
	newVideo(video) {
		this.video.play();
		// Set a new hash for a new video
		if (video) {
			this.cacher.newVideo(video.src);
		}
		// Make sure no interval was set before or it was cleared
		if (!this.frameInterval) {
			this.frameIntervalDelay = 500; // ms
			this.frameInterval = setInterval(async () => {
				let framesLeftToProcess = await this.processFrame();
				// If video paused/stopped/ended
				if (!framesLeftToProcess) clearInterval(this.frameInterval);
			}, this.frameIntervalDelay);
		}
	}


}