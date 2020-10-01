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

import AbstractRenderer from './AbstractRenderer';

const defaultColor = 'aqua';
const noseColor = 'red';
const skeletonColor = 'green';
const eyeColor = 'purple';
const earColor = 'black';
const shoulderColor = 'yellow';
const elbowColor = 'purple';
const wristColor = 'cyan';
const hipColor = 'white';
const kneeColor = 'gray';
const ankleColor = 'magenta';
const boundingBoxColor = 'red';
const lineWidth = 2;

export default class PoseDetectionRenderer extends AbstractRenderer {
  constructor(name, video, canvas, width, height) {
    super(name, video, canvas, width, height);
    console.table({ name, video, canvas, width, height })
  }

	/**	For each pose (i.e. person) detected in an image, loop through
	  *	the poses and draw the resulting skeleton and keypoints if over
	  * certain confidence scores
	  */
	renderFrame(poses, minPartConfidence, minPoseConfidence) {
		this.ctx.clearRect(0, 0, this.width, this.height);
		poses.forEach(({score, keypoints}) => {
					if (score >= minPoseConfidence) {
						if (this.state.output.showPoints) {
							this.drawKeypoints(keypoints, minPartConfidence);
						}
						if (this.state.output.showSkeleton) {
							this.drawSkeleton(keypoints, minPartConfidence);
						}
						if (this.state.output.showBoundingBox) {
							this.drawBoundingBox(keypoints);
						}
					}
				});
	}

  	/**
	* Draw pose keypoints onto a canvas
	*/
	drawKeypoints(keypoints, minConfidence, scale = 1) {
		for (let i = 0; i < keypoints.length; i++) {
			const keypoint = keypoints[i];
			const keypointDrawRadius = 3;
			let color = defaultColor;

			// Don't draw anything if not confident
			if (keypoint.score < minConfidence) continue;
			
			switch (i) {
				case 0: color = noseColor; break; // Nose
				case 1: color = eyeColor; break; // Left eye
				case 2: color = eyeColor; break; // Right eye
				case 3: color = earColor; break; // Left ear
				case 4: color = earColor; break; // Right ear
				case 5: color = shoulderColor; break; // Left shoulder
				case 6: color = shoulderColor; break; // Right shoulder
				case 7: color = elbowColor; break; // Left elbow
				case 8: color = elbowColor; break; // Right elbow
				case 9: color = wristColor; break; // Left wrist
				case 10: color = wristColor; break; // Right wrist
				case 11: color = hipColor; break; // Left hip
				case 12: color = hipColor; break; // Right hip
				case 13: color = kneeColor; break; // Left knee
				case 14: color = kneeColor; break; // Right knee
				case 15: color = ankleColor; break; // Left ankle
				case 16: color = ankleColor; break; // Right ankle
			}
			const {y, x} = keypoint.position;
			this.drawPoint(y * scale, x * scale, keypointDrawRadius, color);
		}
	}



	/**
	* Draws a pose skeleton by looking up all adjacent keypoints/joints
	*/
	drawSkeleton(keypoints, minConfidence, scale = 1) {
		const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
			keypoints, minConfidence);

		adjacentKeyPoints.forEach((keypoints) => {
			this.drawSegment(this.toTuple(keypoints[0].position),
				this.toTuple(keypoints[1].position), skeletonColor, scale);
		});
	}

	/**
	* Draw the bounding box of a pose. For example, for a whole person standing
	* in an image, the bounding box will begin at the nose and extend to one of
	* ankles
	*/
	drawBoundingBox(keypoints) {
		const boundingBox = posenet.getBoundingBox(keypoints);

		this.ctx.rect(boundingBox.minX, boundingBox.minY,
			boundingBox.maxX - boundingBox.minX, boundingBox.maxY - boundingBox.minY);

		this.ctx.strokeStyle = boundingBoxColor;
		this.ctx.stroke();
	}

	drawPoint(y, x, r, color) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, 2 * Math.PI);
		this.ctx.fillStyle = color;
		this.ctx.fill();
	}

	/**
	* Draws a line on a canvas, i.e. a joint
	*/
	drawSegment([ay, ax], [by, bx], color, scale) {
		this.ctx.beginPath();
		this.ctx.moveTo(ax * scale, ay * scale);
		this.ctx.lineTo(bx * scale, by * scale);
		this.ctx.lineWidth = lineWidth;
		this.ctx.strokeStyle = color;
		this.ctx.stroke();
	}

	/**
	 * Converts a deconstructed object with two elements to a list
	 * @param {object} y, x coordinates
	 */
	toTuple({y, x}) {
		return [y, x];
	}
}