export const openFilePicker = (options?: {
  accept?: string;
  multiple?: boolean;
}): Promise<File[]> => {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = options?.accept ?? "*/*";
    input.multiple = options?.multiple ?? true;

    input.onchange = () => {
      resolve(input.files ? Array.from(input.files) : []);
    };

    input.click();
  });
};
