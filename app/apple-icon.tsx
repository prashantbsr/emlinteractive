import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#f5f5f5",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -2 }}>eml</div>
        <div style={{ fontSize: 18, color: "#a3a3a3", marginTop: 6 }}>
          exp − ln
        </div>
      </div>
    ),
    { ...size },
  );
}
