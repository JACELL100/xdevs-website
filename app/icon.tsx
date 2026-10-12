import { ImageResponse } from "next/og";
import { emblemDataUri } from "@/lib/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const emblem = emblemDataUri("#000000");

export default function Icon() {
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={emblem} width={64} height={64} alt="" />
    ),
    size,
  );
}
