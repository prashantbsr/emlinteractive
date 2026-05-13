import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#f5f5f5",
          fontSize: 28,
          fontWeight: 700,
          fontFamily: "monospace",
          letterSpacing: -1,
        }}
      >
        eml
      </div>
    ),
    { ...size },
  );
}
