export const getVideoThumbnail = (file: File, seekTo = 0.1): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const url = URL.createObjectURL(file);

    video.src = url;
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;

    video.onloadedmetadata = () => {
      video.currentTime = Math.min(seekTo, video.duration || seekTo);
    };

    video.onseeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject();
        return;
      }

      ctx.drawImage(video, 0, 0);
      const preview = canvas.toDataURL("image/jpeg", 0.8);

      URL.revokeObjectURL(url);
      resolve(preview);
    };

    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject();
    };
  });
};
