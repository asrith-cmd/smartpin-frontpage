import type { ReactNode } from "react";

/** Common shape for a section's title+description copy blocks. */
export interface SectionCopyItem {
  title: string;
  desc: string;
}

/** A workflow tile in HowItWorksSection's left info panel. */
export interface HowItWorksTile extends SectionCopyItem {
  label: string;
}

/** A single media frame in HowItWorksSection's carousel, tied to a tile index. */
export interface HowItWorksFrame {
  tile: number;
  type: "video" | "image";
  src: string;
}

/** A feature callout paired with an icon (DeviceSection's `points`). */
export interface IconCopyItem extends SectionCopyItem {
  icon: ReactNode;
}
