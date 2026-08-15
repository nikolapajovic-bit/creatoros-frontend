"use client";

import { useRef, useState, useEffect } from "react";
import { RotateCcw, PenLine } from "lucide-react";

interface SignatureCanvasProps {
  onChange: (dataUrl: string | null) => void;
}

export function SignatureCanvas({ onChange }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const hasDrawn = useRef(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Beli background (PNG čuvamo bez providnosti da bude čitljivo na svakoj pozadini u PDF-u)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#111111";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  function getPos(e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      const touch = e.touches[0];
      return { x: (touch.clientX - rect.left) * scaleX, y: (touch.clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    isDrawing.current = true;
    const { x, y } = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    e.preventDefault();
    const { x, y } = getPos(e, canvas);
    ctx.lineTo(x, y);
    ctx.stroke();
    hasDrawn.current = true;
    setIsEmpty(false);
  }

  function endDraw() {
    isDrawing.current = false;
    if (hasDrawn.current) {
      emitDataUrl();
    }
  }

  function emitDataUrl() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onChange(canvas.toDataURL("image/png"));
  }

  function handleClear() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    hasDrawn.current = false;
    setIsEmpty(true);
    onChange(null);
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-brand/30 bg-white transition-colors focus-within:border-brand">
        <canvas
          ref={canvasRef}
          width={500}
          height={180}
          className="h-45 w-full cursor-crosshair touch-none"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
        {isEmpty && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-gray-400">
            <PenLine className="h-5 w-5" />
            <p className="text-sm">Draw your signature here</p>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={handleClear}
        className="mt-2 flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-ink-muted transition-colors hover:bg-surface-raised hover:text-ink"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Clear
      </button>
    </div>
  );
}