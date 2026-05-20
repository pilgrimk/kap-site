import { ImageResponse } from "next/og";

export const alt = "KAP Enterprises — AI Automation for SMBs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          background: "#fffced",
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 85% 100%, rgba(241,117,88,0.32), transparent 70%), radial-gradient(ellipse 50% 50% at 10% 0%, rgba(177,41,110,0.12), transparent 70%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#b1296e",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(26,26,26,0.7)",
              fontWeight: 500,
            }}
          >
            Done-for-you AI automation
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: 112,
              fontWeight: 600,
              color: "#1a1a1a",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            AI automation
          </div>
          <div
            style={{
              fontSize: 112,
              fontWeight: 600,
              color: "#1a1a1a",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            systems for SMBs.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 22,
            color: "rgba(26,26,26,0.65)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <span style={{ color: "#1a1a1a" }}>KAP Enterprises</span>
          <span style={{ color: "rgba(26,26,26,0.3)" }}>·</span>
          <span>30+ years engineering</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
