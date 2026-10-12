import { ImageResponse } from "next/og";
import { emblemDataUri } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const emblem = emblemDataUri("#000000");

export default function AppleIcon() {
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={emblem} width={180} height={180} alt="" />
    ),
    size,
  );
}
