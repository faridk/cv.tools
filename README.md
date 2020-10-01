# cv.tools frontend-only application design document
# Introduction
## Architecture
Engines (`src/engines` with main class `AbstractEngine`) are core classes of this application. They handle all Computer Vision and Machine Learning.
Cachers (`src/cachers` with main class `AbstractCacher`) are classes that save output (not as images) of different engines in Local Storage for it to be rendered later.
Renderers (`src/renderers` with main class `AbstractRenderer`) show either cache or live engine output on their own respective canvases that are part of React components stored in (`src/components/canvases` folder) which are later layered together in `src/components/canvases/CanvasContainer` component.

A Component starts an Engine which starts a Cacher when Cacher will cache enough data the original Component will be notified and then a corresponding Renderer can be started as well to show the Engine's cached output.
