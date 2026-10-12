import { ImageResponse } from "next/og";
import { emblemDataUri } from "@/lib/og";

export const alt = "THE xDEVS: We build what's next.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const emblem = emblemDataUri();

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px 96px",
          background: "radial-gradient(circle at 75% 40%, #1c1d20 0%, #000 60%)",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontSize: 26, color: "#9A9FA7", letterSpacing: 4 }}>{"THE <xDEVS>"}</div>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 1, marginTop: 28 }}>
            We build what&apos;s next.
          </div>
          <div style={{ fontSize: 28, color: "#B9BDC4", marginTop: 32, lineHeight: 1.35 }}>
            Intelligent, secure and scalable software, from web and mobile to AI and blockchain.
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={emblem} width={380} height={357} alt="" />
      </div>
    ),
    size,
  );
}
