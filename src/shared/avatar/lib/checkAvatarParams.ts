import { AVATAR_PARAMS } from "./constants";
import { getImageSize } from "./getImageSize";

export const checkAvatarParams = async (
  file: File,
): Promise<{ isValid: boolean; error?: string }> => {
  if (file.size === 0) {
    return { isValid: false, error: "Файл не выбран." };
  }
  if (!AVATAR_PARAMS.types.includes(file.type)) {
    return {
      isValid: false,
      error: "Недопустимый формат файла. Допустимые форматы: PNG, JPG, JPEG, BMP.",
    };
  }
  try {
    const { width, height } = await getImageSize(file);
    if (width < AVATAR_PARAMS.minWidth || height < AVATAR_PARAMS.minHeight) {
      return { isValid: false, error: "Минимальный размер изображения 320x320px" };
    }
    if (file.size > AVATAR_PARAMS.maxSize) {
      return { isValid: false, error: "Размер изображения слишком большой." };
    }
  } catch (error) {
    console.log(error);
    return { isValid: false, error: "Не удалось прочитать изображение" };
  }

  return { isValid: true };
};
