import { ImageResponse } from "next/og";
import { profile } from "@/content/portfolio";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — Portfolio`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "76px 84px",
          background:
            "linear-gradient(135deg, #eaf0fb 0%, #dbe6ff 55%, #cdddff 100%)",
          color: "#0d1531",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 22px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.8)",
              fontSize: 26,
              letterSpacing: 3,
              color: "#39456b",
            }}
          >
            PORTFOLIO
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 76,
              height: 76,
              borderRadius: 20,
              background: "linear-gradient(135deg, #1e40ff, #5b7cff)",
              color: "#fff",
              fontSize: 38,
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
        </div>

        {/* name + role */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 38,
              color: "#1e40ff",
              fontWeight: 600,
            }}
          >
            {profile.roles.join("  •  ")}
          </div>
        </div>

        {/* bottom strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            color: "#39456b",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#1e40ff",
            }}
          />
          Building end to end, exploring Web3.
        </div>
      </div>
    ),
    { ...size }
  );
}
