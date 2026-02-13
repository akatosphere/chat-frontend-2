import { AVATAR_PARAMS } from "./constants";

export type Crop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const getCroppedImg = (imageSrc: string, crop: Crop): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const width = Math.max(crop.width, AVATAR_PARAMS.minWidth);
      const height = Math.max(crop.height, AVATAR_PARAMS.minHeight);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) return reject("No 2d context");

      ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject("Canvas is empty");
          const url = URL.createObjectURL(blob);
          resolve(url);
        },
        "image/jpeg",
        0.9,
      );
    };
    image.onerror = () => reject("Failed to load image");
  });
};
