import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0a0a0a",
          color: "#f5f5f5",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: -1,
              color: "#f5f5f5",
            }}
          >
            EMLinteractive
          </div>
          <div style={{ fontSize: 20, color: "#737373" }}>
            · interactive math playground
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#f5f5f5",
              maxWidth: "1000px",
            }}
          >
            one operator. every elementary function.
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#a3a3a3",
              fontWeight: 500,
            }}
          >
            eml(x, y) = exp(x) − ln(y)
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#737373",
          }}
        >
          <div>Dr. Prashant Sharma · Pensieve Labs</div>
          <div>prashantbsr.github.io/emlinteractive</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
