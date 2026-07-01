import { useId } from "react";

const WAVE_PATH =
  "M17.5021 82.9372C52.6685 87.7461 112.942 108.361 201.697 121.151C290.452 133.941 351.366 142.913 420.238 143.94C489.109 144.967 562.451 137.872 629.935 117.813C697.418 97.7535 794.62 62.4173 862.003 42.5805C929.386 22.7437 963.459 19.4991 995.519 18.2022C1027.58 16.9052 1075.13 16.9052 1119.49 22.6164C1163.86 28.3275 1203.59 39.7499 1240.62 56.3064C1277.65 72.8629 1310.76 94.2075 1335.05 111.54C1359.35 128.873 1373.81 141.547 1379.5 144.5";

interface DecorativeWaveProps {
  /** Mirror the wave horizontally — used where the design calls for the opposite curve direction. */
  flip?: boolean;
}

/**
 * The gradient "wave" decoration behind section headings (HowItWorksSection,
 * UpgradeSection). Both usages previously hand-duplicated this markup,
 * including a separately hand-mirrored path for the flipped variant — that
 * mirrored path is geometrically identical to this one reflected across the
 * vertical axis, so `flip` renders the same path with a CSS transform
 * instead of a second copy of the coordinates.
 */
export function DecorativeWave({ flip = false }: DecorativeWaveProps) {
  const gradientId = useId();
  return (
    <div
      className="absolute left-1/2 pointer-events-none z-0"
      style={{
        width: "94.58vw",
        height: "8.82vw",
        top: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1397.01 162.004"
        fill="none"
        preserveAspectRatio="none"
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
      >
        <path
          d={WAVE_PATH}
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          strokeOpacity="0.5"
          strokeWidth="35"
        />
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#161617" />
            <stop offset="50%" stopColor="#054FD5" />
            <stop offset="100%" stopColor="#161617" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
