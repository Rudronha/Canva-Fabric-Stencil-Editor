import React from "react";
import "./Toolbar.css";
import frames from "../data/framesList";

export default function Toolbar({
  undo,
  redo,
  clear,
  removeSelectedObject,
  cropImage,
  setCropImage,
  addPhotoFrameFromSvg,
  exportSVG,
  handleImageUpload 
}) {

  return (
    <div className="toolbar-container">
      <div className="toolbar-actions">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files[0])}
          disabled={!cropImage}
        />
        <button onClick={clear} disabled={!cropImage}>Clear</button>
        <button onClick={undo} disabled={!cropImage}>Undo</button>
        <button onClick={redo} disabled={!cropImage}>Redo</button>
        <button onClick={removeSelectedObject} disabled={!cropImage}>Delete</button>
        <button onClick={()=>setCropImage(cropImage)}disabled={!cropImage}>Crop</button>
        <button onClick={exportSVG} disabled={!cropImage}>ToSVG</button>
      </div>
      <div className="frames-section">
        <h3>Choose a Frame</h3>
        <div className="frames-list">
          {frames.map((frame, idx) => (
            <div
              key={idx}
              className="frame-item"
              onClick={() => {
                addPhotoFrameFromSvg(frame.src);
              }}
            >
              <img width="32" height="32" src={frame.preview} alt={frame.name} />
              <div style={{marginTop:6}}>{frame.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
