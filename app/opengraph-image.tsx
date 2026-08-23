import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Magill Grain Store — Quality Poultry, Bird Grains and Animal Feed"

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
          padding: 72,
          backgroundColor: "#00072f",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 10% 5%, #0d1f8a 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 90% 100%, rgba(229,163,0,0.25) 0%, transparent 65%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              backgroundColor: "#f8c53c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00072f",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            MG
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#f8c53c",
            }}
          >
            Magill Grain Store
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.08 }}>
            Quality Poultry, Bird Grains
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.08,
              color: "#f8c53c",
            }}
          >
            and Animal Feed
          </div>
        </div>

        <div style={{ display: "flex", gap: 40, fontSize: 24, color: "#b8c4ff" }}>
          <span>574 Magill Road, Magill SA 5072</span>
          <span>(08) 8331 8159</span>
        </div>
      </div>
    ),
    size
  )
}
