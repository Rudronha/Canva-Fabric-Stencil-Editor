import React from "react";
import { useFabricCanvas } from "./hooks/useFabricCanvas";
import CanvasContainer from "./components/CanvasContainer";
import Toolbar from "./components/Toolbar";
import frames from "./data/framesList";
import "./App.css"

function App() {
  const {
    editor,
    onReady,
    color,
    setColor,
    cropImage,
    setCropImage,
    addCircle,
    addRectangle,
    addText,
    undo,
    redo,
    clear,
    removeSelectedObject,
    toggleDraw,
    toggleSize,
    handleImageUpload,
    addPhotoFrameFromSvg,
    uploadedImageUrl,
    addFramedImage,
    exportSVG,
  } = useFabricCanvas();

  return (
    <div className="App">
      <h1>Canva-like Stencil Editor</h1>
      <div className="app-layout">
        <div className="toolbar">
          <Toolbar
            addCircle={addCircle}
            addRectangle={addRectangle}
            addText={addText}
            undo={undo}
            redo={redo}
            clear={clear}
            removeSelectedObject={removeSelectedObject}
            toggleDraw={toggleDraw}
            toggleSize={toggleSize}
            cropImage={cropImage}
            setCropImage={setCropImage}
            color={color}
            setColor={setColor}
            addPhotoFrameFromSvg={() => addPhotoFrameFromSvg(frames[0].src)}
            exportSVG={exportSVG}
            handleImageUpload={handleImageUpload}
            uploadedImageUrl={uploadedImageUrl}
            addFramedImage={addFramedImage}
          />
        </div>
        <div  className="canvas-wrapper">
          <CanvasContainer onReady={onReady} />
        </div>
      </div>
    </div>
  );
}

export default App;

