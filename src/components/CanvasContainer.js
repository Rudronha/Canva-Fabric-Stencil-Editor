import React, { useRef, useLayoutEffect, useState } from "react";
import { FabricJSCanvas } from "fabricjs-react";

export default function CanvasContainer({ onReady }) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 800, height: 600 });

  useLayoutEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        setSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    }
    updateSize(); // Call once on mount
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div ref={containerRef} className="canvas-inner">
      <FabricJSCanvas 
        className="sample-canvas" 
        width={size.width}
        height={size.height}
        onReady={onReady} 
      />
    </div>
  );
}