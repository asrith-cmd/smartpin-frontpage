/// <reference types="vite/client" />

// Ambient module declaration for the custom `figma:asset/*` resolver defined
// in vite.config.ts, which maps these specifiers to files under src/assets.
declare module "figma:asset/*" {
  const src: string;
  export default src;
}
