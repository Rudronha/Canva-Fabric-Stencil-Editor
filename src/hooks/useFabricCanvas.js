import { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import { useFabricJSEditor } from "fabricjs-react";

export function useFabricCanvas() {
  const { editor, onReady } = useFabricJSEditor();
  const historyRef = useRef([]);
  const [color, setColor] = useState("#35363a");
  const [cropImage, setCropImage] = useState(true);
  const [uploadedImageUrl, setUploadedImageUrl] = useState();

  useEffect(() => {
    if (editor && editor.canvas) {
      editor.canvas.setHeight(500);
      editor.canvas.setWidth(500);
      editor.canvas.renderAll();
    }
  }, [editor]);

  // Setup event listeners (zoom, drag, etc.)
  useEffect(() => {
    if (!editor || !editor.canvas) return;

    const canvas = editor.canvas;
    canvas.__eventListeners = {};

    if (cropImage) {
      // zoom and drag handlers (same as your previous effect)
      // ...
    }
  }, [editor, cropImage]);

  // Add shapes
  const addCircle = () => {
    if (!editor) return;
    editor.addCircle();
    editor.addLine();
  };

  const addRectangle = () => {
    if (!editor) return;
    editor.addRectangle();
  };

  const addText = () => {
    if (!editor) return;
    editor.addText("inset text");
  };

  // Undo, redo, clear, remove selected
  const undo = () => {
    if (!editor || !editor.canvas) return;
    const objects = editor.canvas.getObjects();
    if (objects.length > 0) {
      const removedObject = objects.pop();
      editor.canvas.remove(removedObject);
      historyRef.current.push(removedObject);
      editor.canvas.renderAll();
    }
  };

  const redo = () => {
    if (!editor || !editor.canvas) return;
    if (historyRef.current.length > 0) {
      const obj = historyRef.current.pop();
      editor.canvas.add(obj);
      editor.canvas.renderAll();
    }
  };

  const clear = () => {
    if (!editor || !editor.canvas) return;
    editor.canvas.clear();
    historyRef.current = [];
  };

  const removeSelectedObject = () => {
    if (!editor || !editor.canvas) return;
    const activeObj = editor.canvas.getActiveObject();
    if (activeObj) {
      editor.canvas.remove(activeObj);
    }
    editor.canvas.renderAll();
  };

  // Brush controls
  useEffect(() => {
    if (!editor || !editor.canvas) return;
    editor.canvas.freeDrawingBrush.color = color;
  }, [color, editor]);

  const toggleDraw = () => {
    if (!editor || !editor.canvas) return;
    editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode;
  };

  const toggleSize = () => {
    if (!editor || !editor.canvas || !editor.canvas.freeDrawingBrush) return;
    editor.canvas.freeDrawingBrush.width =
      editor.canvas.freeDrawingBrush.width === 12 ? 5 : 12;
  };

  // Image file upload handler
  const handleImageUpload = (file) => {
    if (!editor || !editor.canvas || !file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgUrl = e.target.result;
      setUploadedImageUrl(imgUrl);  // Save URL in state

      fabric.Image.fromURL(imgUrl, (img) => {
        img.scaleToWidth(200);
        editor.canvas.add(img);
        editor.canvas.renderAll();
      });
    };
    reader.readAsDataURL(file);
  };

  // Add photo frame from SVG URL
  const addPhotoFrameFromSvg = (svgUrl) => {
    if (!editor || !editor.canvas) return;
    fabric.loadSVGFromURL(svgUrl, (objects, options) => {
      const svgGroup = fabric.util.groupSVGElements(objects, options);
      svgGroup.set({ left: 100, top: 100, scaleX: 0.5, scaleY: 0.5 });
      editor.canvas.add(svgGroup);
      editor.canvas.renderAll();
    });
  };

  function addFramedImage(imageUrl, framePathData, originalFrameWidth, originalFrameHeight) {
    if (!editor || !editor.canvas) return;
    fabric.Image.fromURL(imageUrl, function(img) {
      // Assume you want the mask to fit the entire image
      const framePath = new fabric.Path(framePathData, {
        left: 0,
        top: 0,
        scaleX: img.width / originalFrameWidth,
        scaleY: img.height / originalFrameHeight
      });
      img.set({
        left: 0,
        top: 0,
        clipPath: framePath
      });
      editor.canvas.add(img);
      editor.canvas.renderAll();
    });
  }

// Call this function after user picks image+frame


  function handleDownload() {
    const dataURL = editor.canvas.toDataURL({
      format: 'png',
      multiplier: 2 // For high resolution, optional
    });
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'framed-photo.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Export SVG of canvas
  const exportSVG = () => {
    if (!editor) return;
    const svg = editor.canvas.toSVG();
    console.info(svg);
  };

  return {
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
    handleDownload,
    uploadedImageUrl,
    addFramedImage,
    exportSVG,
  };
}
