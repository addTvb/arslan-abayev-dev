import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#07090f",
          color: "#e8edf7",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#3d7aef",
          }}
        >
          Open to remote roles
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              color: "#8b95a8",
              maxWidth: 820,
            }}
          >
            {site.role}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#8b95a8",
          }}
        >
          Growth · Retention · Delivery
        </div>
      </div>
    ),
    { ...size },
  );
}
