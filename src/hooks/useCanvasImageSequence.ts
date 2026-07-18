import { useEffect, useRef, useState } from "react";

interface UseCanvasImageSequenceOptions {
  frameCount: number;
  frameWidth: number;
  frameHeight: number;
  frameUrl: (index: number) => string;
  /** "contain" (default) letterboxes to fit; "cover" fills the canvas, cropping overflow. */
  fit?: "contain" | "cover";
  /** Frames to fetch before `ready` flips true. Defaults to the whole sequence. */
  readyThreshold?: number;
}

/** "contain"/"cover" pick the fit mode; a number is used directly as the draw scale
 *  (frame pixels -> canvas pixels), letting callers blend smoothly between the two
 *  instead of snapping between them. */
type FitOverride = "contain" | "cover" | number;

/** How many frames may be in flight at once.
 *
 * This is the single most important knob for perceived smoothness. Firing all
 * N requests at once (the obvious approach) is actively worse than a small
 * window: HTTP/2 multiplexes them onto one connection, every response gets an
 * equal slice of bandwidth, and *nothing* finishes early — the scrubber sits on
 * frame 0 until the whole sequence is nearly done. A small window means frames
 * complete in the order they are actually needed.
 */
const CONCURRENCY = 6;

/**
 * Preloads a numbered sequence of images and exposes a `drawFrame(index)`
 * function that paints the nearest-already-loaded frame onto a canvas,
 * scaled to fit while preserving aspect ratio. Redraws automatically on
 * window resize.
 *
 * Frames are fetched in playback order with bounded concurrency so the frames
 * nearest the start are decoded first and the scrub has something to show
 * immediately.
 */
export function useCanvasImageSequence({
  frameCount,
  frameWidth,
  frameHeight,
  frameUrl,
  fit = "contain",
  readyThreshold = frameCount,
}: UseCanvasImageSequenceOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);

  /** True once enough of the sequence has decoded to scrub without gaps. */
  const [ready, setReady] = useState(false);

  const drawFrame = (index: number, fitOverride?: FitOverride) => {
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

    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const activeFit = fitOverride ?? fit;
    const scale =
      typeof activeFit === "number"
        ? activeFit
        : activeFit === "cover"
          ? Math.max(w / frameWidth, h / frameHeight)
          : Math.min(w / frameWidth, h / frameHeight);
    const dw = frameWidth * scale;
    const dh = frameHeight * scale;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  };

  // Preload the image sequence in playback order, CONCURRENCY frames at a time.
  useEffect(() => {
    let cancelled = false;

    const imgs: HTMLImageElement[] = new Array(frameCount);
    imagesRef.current = imgs;

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        imgs[i] = img;
        img.decoding = "async";
        // Resolve on error too — a missing frame must not stall the queue; the
        // nearest-loaded-frame walk in drawFrame already covers the gap.
        img.onload = () => {
          if (i === 0 && !cancelled) drawFrame(0);
          resolve();
        };
        img.onerror = () => resolve();
        img.src = frameUrl(i);
        // A cached frame can already be complete before onload is attached.
        if (img.complete && img.naturalWidth) {
          if (i === 0 && !cancelled) drawFrame(0);
          resolve();
        }
      });

    (async () => {
      let next = 0;
      let done = 0;
      const worker = async () => {
        while (!cancelled) {
          const i = next++;
          if (i >= frameCount) return;
          await load(i);
          done++;
          if (done >= readyThreshold && !cancelled) setReady(true);
        }
      };
      await Promise.all(
        Array.from({ length: Math.min(CONCURRENCY, frameCount) }, worker),
      );
      if (!cancelled) setReady(true);
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redraw the current frame on resize (canvas dimensions depend on layout)
  useEffect(() => {
    const onResize = () => drawFrame(frameRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { canvasRef, imagesRef, frameRef, drawFrame, ready };
}
