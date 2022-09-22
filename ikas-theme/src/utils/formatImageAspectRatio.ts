import { ImageAspectRatio } from "src/components/__generated__/types";

export default function formatImageAspectRatio(
  imageAspectRatio: ImageAspectRatio
) {
  const width = imageAspectRatio.split("_")[0];
  const height = imageAspectRatio.split("_")[1];

  return { width, height };
}
