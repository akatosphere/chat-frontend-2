export const downloadFile = async (fileUrl: string, fileName?: string) => {
  try {
    const response = await fetch(fileUrl, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();

    let finalFileName = fileName;
    if (!finalFileName) {
      const urlParts = fileUrl.split("/");
      finalFileName = urlParts[urlParts.length - 1] || "download";

      if (!finalFileName.includes(".")) {
        const contentType = response.headers.get("content-type");
        const extension = contentType?.split("/")[1] || "bin";
        finalFileName += `.${extension}`;
      }
    }

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = finalFileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error downloading file:", error);

    try {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName || fileUrl.split("/").pop() || "download";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (fallbackError) {
      console.error("Fallback download also failed:", fallbackError);

      window.open(fileUrl, "_blank");
    }
  }
};
