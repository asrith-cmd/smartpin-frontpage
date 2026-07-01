import svgPaths from "@/constants/logo-paths";

export function SmartPinLogoSmall({ darkMode = false }: { darkMode?: boolean }) {
  const fill = darkMode ? "#161617" : "white";
  const accentFill = "#054FD5";
  return (
    <div className="relative shrink-0" style={{ width: 127, height: 27.617 }}>
      <svg
        className="absolute block inset-0 w-full h-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 127 27.6171"
      >
        <path d={svgPaths.p30e5f4b0} fill={fill} />
        <path d={svgPaths.pe0261f0} fill={accentFill} />
        <path d={svgPaths.p2e5a8600} fill={fill} />
        <path d={svgPaths.p25a11600} fill={accentFill} />
        <path d={svgPaths.p8559aa0} fill={fill} />
        <path d={svgPaths.p622a00} fill={fill} />
        <path d={svgPaths.pbe92d00} fill={fill} />
        <path d={svgPaths.p28c5c600} fill={accentFill} />
        <path d={svgPaths.p1c70b100} fill={accentFill} />
      </svg>
    </div>
  );
}

export function SmartPinLogoBig({ fill = "#E8E8EF" }: { fill?: string }) {
  return (
    <div className="relative shrink-0" style={{ width: 402, height: 87.418, maxWidth: "100%" }}>
      <svg
        className="block w-full h-full"
        fill="none"
        viewBox="0 0 402 87.4177"
      >
        <path d={svgPaths.p3487bf80} fill={fill} />
        <path d={svgPaths.p3cff6300} fill={fill} />
        <path d={svgPaths.p38a1da00} fill={fill} />
        <path d={svgPaths.p159a9480} fill={fill} />
        <path d={svgPaths.p4064400} fill={fill} />
        <path d={svgPaths.p314c7bb0} fill={fill} />
        <path d={svgPaths.pf122100} fill={fill} />
        <path d={svgPaths.p34caae00} fill={fill} />
        <path d={svgPaths.p26db0500} fill={fill} />
      </svg>
    </div>
  );
}
