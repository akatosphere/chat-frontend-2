export const openImagePicker = (): Promise<File[]> => {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;

    input.onchange = () => {
      resolve(input.files ? Array.from(input.files) : []);
    };

    input.click();
  });
};
