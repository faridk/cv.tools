/**
 * Class representing a Cacher that saves JSON
 * processed frame data to Local Storage
 */
export default class LocalStorageCacher {
	static cacherInstanceCount = 0;
	static totalFramesCached = 0;
	/**
	 * Creates a new LocalStorageCacher instance and assumes
	 * that demo video file's data is being saved by default
	 * @param {string} name - name of an instance (optional)
	 */
	constructor(name="LocalStorageCacher") {
		this.name = name;
		console.log(`New Local Storage Cacher: '${this.name}' created (total: ${++LocalStorageCacher.cacherInstanceCount})`);
		// Write frame metadata to this video hash
		// Unless newVideo(hash) is called this value shouldn't change
		this.currentVideoHash = 'demo';
		this.currentVideoFramesCached = 0;
		this.currentTime = new Date().getTime();
		this.totalFramesCached = 0;
	}

	/**
	 * Ran when using the same cacher instance for a new video
	 * @param {string} hash - hash or just any string that can
	 * uniquely identify a video (e.g. name of the file itself)
	 */
	newVideo(hash) {
		this.currentVideoHash = hash;
		this.currentVideoFramesCached = 0;
		console.log(`${this.name} is caching a new video now with hash ${this.currentVideoHash}`);
		// Collection of keys of LocalStorage that link
		// to frames in a video
		// let videoFrameKeys;
	}

	/**
	 * Just runs newVideo(hash) method
	 * @param {string} hash - hash or just any string that can
	 * uniquely identify a video (e.g. name of the file itself)
	 */
	start(videoHash) {
		console.log(`Starting ${this.name}`);
		if (videoHash) {
			this.newVideo(videoHash);
		}
		console.log(`Video Hash: ${this.videoHash} of type: ${typeof(this.videoHash)}`); 
	}
	
	/**
	 * Saves JSON data of a frame to Local Storage along with a
	 * timestamp and then counts total amount of frames cached.
	 * A random string (key) is generated to identify a frame (value)
	 * @param {object} frame - object to be serialized to JSON
	 * in order to be saved that holds output data of an Engine
	 * for a unique frame in a video.
	 * @param {number} timestamp - at what duration of the
	 * original video was the above mentioned frame processed
	 */
	cacheFrame(frame, timestamp) {
		let newFrameId = Math.random().toString(36).substring(2, 15);
		// Both will be saved to localStorage as one serialized object/JSON
		window.localStorage.setItem(newFrameId, JSON.stringify({ timestamp, frame }));
		// Update total amount of frames cached both for
		// pose detection and in general across the app
		LocalStorageCacher.totalFramesCached++;
		console.log(`Total frames cached: ${LocalStorageCacher.totalFramesCached}`);
		this.currentVideoFramesCached++
		console.log(`Current video frames cached: ${this.currentVideoFramesCached}`);
	}

	loadLocalStorageVideoMetadata() {
	}
}