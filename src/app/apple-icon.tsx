import { ImageResponse } from "next/og";

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
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <div
          style={{
            width: 180,
            height: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#3d7aef",
            borderRadius: 9999,
            color: "#ffffff",
            fontSize: 104,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          A
        </div>
      </div>
    ),
    { ...size },
  );
}
