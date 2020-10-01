import AbstractRenderer from './AbstractRenderer';

export default class FaceRecogntionRenderer extends AbstractRenderer {
  constructor(name, video, canvas, width, height) {
    super(name, video, canvas, width, height);
    console.table({ name, video, canvas, width, height })
  }
  start() {
    super.start();
  }
  renderFrame() {
  }
}