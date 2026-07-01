import { useEffect, useRef } from "react";

interface UseCanvasImageSequenceOptions {
  frameCount: number;
  frameWidth: number;
  frameHeight: number;
  frameUrl: (index: number) => string;
}

/**
 * Preloads a numbered sequence of images and exposes a `drawFrame(index)`
 * function that paints the nearest-already-loaded frame onto a canvas,
 * scaled to fit while preserving aspect ratio. Redraws automatically on
 * window resize.
 *
 * Extracted from DeviceSection and FeaturesSection, which previously
 * duplicated this preload/draw logic byte-for-byte.
 */
export function useCanvasImageSequence({
  frameCount,
  frameWidth,
  frameHeight,
  frameUrl,
}: UseCanvasImageSequenceOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const imgs = imagesRef.current;
    let i = index;
    while (i > 0 && !(imgs[i] && imgs[i].complete && imgs[i].naturalWidth)) i--;
    const img = imgs[i];
    if (!img || !img.complete || !img.naturalWidth) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const scale = Math.min(w / frameWidth, h / frameHeight);
    const dw = frameWidth * scale;
    const dh = frameHeight * scale;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  };

  // Preload the image sequence
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(i);
      imgs.push(img);
    }
    imagesRef.current = imgs;
    imgs[0].onload = () => drawFrame(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redraw the current frame on resize (canvas dimensions depend on layout)
  useEffect(() => {
    const onResize = () => drawFrame(frameRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { canvasRef, imagesRef, frameRef, drawFrame };
}
