import { ImageResponse } from "next/og";

export const alt = "HoltzDigitalUI — Tailwind CSS Templates, UI Kits & Icons";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0c0a1e 0%, #180540 60%, #0c0a1e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Icon badge */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            background: "linear-gradient(135deg, #4f46e5 0%, #7008e7 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <div style={{ display: "flex", position: "relative", width: 60, height: 60 }}>
            <div style={{ position: "absolute", left: 13, top: 13, width: 7, height: 34, background: "white", borderRadius: 3.5 }} />
            <div style={{ position: "absolute", right: 13, top: 13, width: 7, height: 34, background: "white", borderRadius: 3.5 }} />
            <div style={{ position: "absolute", left: 13, top: 26, width: 34, height: 7, background: "white", borderRadius: 3.5 }} />
          </div>
        </div>

        {/* Site name */}
        <div style={{ display: "flex", alignItems: "baseline", marginBottom: 20 }}>
          <span style={{ fontSize: 76, fontWeight: 800, color: "white", letterSpacing: "-3px" }}>
            HoltzDigital
          </span>
          <span style={{ fontSize: 76, fontWeight: 800, color: "#7008e7", letterSpacing: "-3px" }}>
            UI
          </span>
        </div>

        {/* Tagline */}
        <div style={{ display: "flex", fontSize: 28, color: "#94a3b8", fontWeight: 400, maxWidth: 680, textAlign: "center" }}>
          The premier marketplace for Tailwind CSS templates, UI kits &amp; icons
        </div>

        {/* Domain pill */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 40,
            alignItems: "center",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 100,
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <span style={{ fontSize: 18, color: "#64748b", fontWeight: 500 }}>
            holtzdigitalui.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
