export default class AbstractRenderer {
  static rendererInstanceCount = 0;
  constructor(name, video, canvas, width, height) {
		if (new.target === AbstractRenderer) {
			throw new TypeError("Cannot construct AbstractRenderer instances directly (hence the name)");
		}
    this.name = name;
    this.video = video;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = width;
    this.height = height;
    console.log(`New Canvas Renderer: '${this.name}' created (total: ${++AbstractRenderer.rendererInstanceCount})`);
  }

  start() {
    console.log(`Starting ${this.name}`);
  }
  
  renderFrame() {
  }
}