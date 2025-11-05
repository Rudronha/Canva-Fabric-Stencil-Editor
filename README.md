# FabricJS React Image Editor

This is a React application using FabricJS and fabricjs-react for interactive canvas editing. It allows free drawing, shape adding, text insertion, image background setting, SVG loading, zooming, cropping mode, and undo/redo functionality. Images can be uploaded and added onto the canvas dynamically.

## Features

- FabricJS canvas integration via fabricjs-react
- Add frames: from perdefine stensile
- Crop mode toggle that disables/enables canvas interactions
- Undo/Redo of canvas objects
- Clear canvas and remove selected objects
- Upload and add custom images from local files

## Demo
[[▶️ Watch Demo Video](https://drive.google.com/file/d/14QJMo0CwM3u9YMLP3CRxfjFvVkBOn0Fw/view?usp=sharing)]

## Try Demo(Do resize the window once)
[Fabric-Editor ](https://Rudronha.github.io/Canva-Fabric-Stencil-Editor/)


## Getting Started

### Installation

Make sure you have Node.js installed. Then run:

```
npm install
npm start
```

### Usage

- Use the buttons to add shapes, text and toggle drawing mode.
- Use the color picker to change stroke color in drawing mode.
- Upload images using the file input to add them onto the canvas.
- Use mouse wheel to zoom, hold Ctrl + drag to pan.
- Toggle crop mode disables interactions for cropping.
- Undo/Redo buttons manage object history.
- Export canvas as SVG or load predefined SVG elements.

### Image Upload

Use the file input to select an image from your device. The image will be loaded and added as a Fabric.Image object on the canvas, where you can move, resize or delete it.

### Dependencies

- React
- fabric 5.5.0
- fabricjs-react

## Folder Structure

- `src/components/` - React components (e.g., Toobar, CanvasContainer).
- `src/hooks/useFabricCanvas` - Main React Hook with all FabricJS logic and all core canvas manipulations.
- `public/` - Static assets such as favicon, index.html, and images available to the app.
- `assets/` - Project-related frames other reference data.
- `README.md` - Project description, setup guide, and documentation.
- `package.json` - Dependency list and build scripts.
- `.gitignore` - Files to exclude from version control.


## Contributing

Feel free to fork the repository and create pull requests for bug fixes or new features.

## License

This project is open source under the MIT License.

