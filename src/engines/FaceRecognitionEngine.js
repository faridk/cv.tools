import AbstractEngine from './AbstractEngine';
import * as faceapi from 'face-api.js';

const MODEL_URL = 'https://cv.tools/face-api.js/';

export default class FaceRecognitionEngine extends AbstractEngine {
	constructor() {
		super();
	}

	async processFrame(name, video, canvas, width, height) {
		super.processFrame(name, video, canvas, width, height);
		if (this.running) {
			let frame = await this.detectFacesWithLandmarks();
			// Cache the frame and attach a timestamp to it
			this.cacher.cacheFrame(frame, this.video.currentTime);
			// return this.recognizeFaces();
			return true;
		} else {
			console.error("Error: Engine is NOT running!");
			return false;
		}
	}

	async loadModels() {
		console.log('Loading models...');
		await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
		await faceapi.loadFaceLandmarkModel(MODEL_URL);
		await faceapi.loadFaceRecognitionModel(MODEL_URL);
		console.log('Models loaded!');
	}

	async detectFacesWithLandmarks(cachedData=null) {
		let fullFaceDescriptions = await faceapi.detectAllFaces(this.video).withFaceLandmarks().withFaceDescriptors();
		fullFaceDescriptions = faceapi.resizeResults(fullFaceDescriptions, { width: this.width, height: this.height })
		
		if (cachedData) {
			if (cachedData.length !== 2) {
				console.log('Wrong parameter count for detectFacesWithLandmarks()');
			} else {
				faceapi.draw.drawDetections(cachedData[0], detectionsArray, {withScore: false});
				faceapi.draw.drawFaceLandmarks(this.canvas, landmarksArray, {drawLines: true});
			}
		} else {
			const detectionsArray = fullFaceDescriptions.map((fd) => fd.detection);
			const landmarksArray = fullFaceDescriptions.map((fd) => fd.landmarks);
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
			faceapi.draw.drawDetections(this.canvas, detectionsArray, {withScore: false});
			faceapi.draw.drawFaceLandmarks(this.canvas, landmarksArray, {drawLines: true})
			return [detectionsArray, landmarksArray];
		};
	}

	async recognizeFaces() {
		let fullFaceDescriptions = await faceapi.detectAllFaces(this.video).withFaceLandmarks().withFaceDescriptors();
		fullFaceDescriptions = fullFaceDescriptions.map((fd) => fd.forSize(600, 337));
		// Three lines above come from another method
		
		const labels = ['joe-rogan', 'elon-musk'];

		const labeledFaceDescriptors = await Promise.all(
			labels.map(async (label) => {
				// fetch image data from urls and convert blob to HTMLImage element
				const imgUrl = `${label}.png`;
				const img = await faceapi.fetchImage(imgUrl);

				// detect the face with the highest score in the image and compute it's landmarks and face descriptor
				const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

				if (!fullFaceDescription) {
					throw new Error(`no faces detected for ${label}`);
				}

				const faceDescriptors = [fullFaceDescription.descriptor];
				return new faceapi.LabeledFaceDescriptors(label, faceDescriptors);
			})
		);

		// 0.6 is a good distance threshold value to judge
		// whether the descriptors match or not
		const maxDescriptorDistance = 0.6;
		const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance);
	
		const results = fullFaceDescriptions.map((fd) => faceMatcher.findBestMatch(fd.descriptor));

		const boxesWithText = results.map((bestMatch, i) => {
			const box = fullFaceDescriptions[i].detection.box;
			const text = bestMatch.toString();
			console.log(text);
			const boxWithText = new faceapi.BoxWithText(box, text);
		});
		faceapi.draw.drawDetections(canvas, boxesWithText);
	}

	/**
	* Returns a reference to "this"
	* Starts after a pause without arguments or
	* or throws an error
	*/
	async start(video, canvas, width, height) {
		// If any of these params are missing
		if (!video || !canvas || !width || !height) {
			// Check if this method is being called after a pause
			if (!this.video || !this.canvas || !this.width || !this.height) {
				// If any parameter is missing throw an errorvideo
				throw "Engine can't start: Parameter(s) missing";
			}
		}
		await super.start();
		await this.loadModels();
		this.frame = this.processFrame();
		// console.log('Detecting faces');
		// await this.detectFaces();
		// console.log('Recognizing faces');
		// await this.recognizeFaces();
		
		// For engineCollector()
		return this;
	}
}