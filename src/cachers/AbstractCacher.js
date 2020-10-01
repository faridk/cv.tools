import LocalStorageCacher from './../cachers/LocalStorageCacher'
export default class AbstractEngine {
	static engineInstanceCount = 0;
	constructor() {
		// This is an abstract class which means no direct instantiation!
		if (new.target === AbstractEngine) {
			throw new TypeError("Cannot construct AbstractEngine instances directly (hence the name)");
		}
		// Require children to override these methods
		if (this.start === undefined) {
			throw new TypeError("Must override method: start");
		}
		if (this.stop === undefined) {
			throw new TypeError("Must override method: stop");
		}
		if (this.processFrame === undefined) {
			throw new TypeError("Must override method: processFrane");
		}
		this.running = false;
		this.cacher = new LocalStorageCacher("Local Storage Cacher");
		console.log(`New CV Engine: '${this.name}' created (total: ${++AbstractEngine.engineInstanceCount})`);
	}
	a-zsync start(name, video, canvas, width, height) {
		this.name = name;
		this.running = true;
		this.video = video;
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.width = width;
		this.height = height;
		console.log(`Starting ${this.name}`);
	}
	async stop() {
		this.running = false;
	}
	async processFrame() {
	}
}