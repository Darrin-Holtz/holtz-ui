import { ImageResponse } from "next/og";

export const runtime = "edge";
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
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow orbs */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(79,70,229,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -60,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(112,8,231,0.2) 0%, transparent 70%)",
          }}
        />

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
            boxShadow: "0 0 60px rgba(112,8,231,0.5)",
          }}
        >
          {/* H letterform: left bar */}
          <div style={{ position: "relative", width: 60, height: 60 }}>
            <div
              style={{
                position: "absolute",
                left: 13,
                top: 13,
                width: 7,
                height: 34,
                background: "white",
                borderRadius: 3.5,
              }}
            />
            {/* Right bar */}
            <div
              style={{
                position: "absolute",
                right: 13,
                top: 13,
                width: 7,
                height: 34,
                background: "white",
                borderRadius: 3.5,
              }}
            />
            {/* Crossbar */}
            <div
              style={{
                position: "absolute",
                left: 13,
                top: 26,
                width: 34,
                height: 7,
                background: "white",
                borderRadius: 3.5,
              }}
            />
          </div>
        </div>

        {/* Site name */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: 20,
            letterSpacing: "-3px",
          }}
        >
          <span
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "white",
            }}
          >
            HoltzDigital
          </span>
          <span
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "#7008e7",
            }}
          >
            UI
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#94a3b8",
            fontWeight: 400,
            maxWidth: 680,
            textAlign: "center",
            lineHeight: 1.5,
            letterSpacing: 0,
          }}
        >
          The premier marketplace for Tailwind CSS templates, UI kits &amp; icons
        </div>

        {/* Bottom domain pill */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
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
