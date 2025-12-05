import { AxiosError } from "axios";
import { MessageError, ValidationError } from "./types";

export type Result<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

export const errorHandler = (error: unknown): string => {
  if (!(error instanceof AxiosError)) {
    return "Неизвестная ошибка";
  }

  const status = error.response?.status;
  const data = error.response?.data;

  if (
    status === 400 &&
    data &&
    typeof data === "object" &&
    !("message" in data) &&
    !("detail" in data)
  ) {
    const validationData = data as ValidationError;

    for (const fieldErrors of Object.values(validationData)) {
      if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
        const msg = fieldErrors[0];
        if (typeof msg === "string") {
          return msg;
        }
      }
    }
    return "Проверьте введённые данные";
  }

  if (data && typeof data === "object") {
    const maybeMessage = (data as MessageError).message;
    const maybeDetail = (data as MessageError).detail;

    if (typeof maybeMessage === "string" && maybeMessage.trim() !== "") {
      return maybeMessage;
    }
    if (typeof maybeDetail === "string" && maybeDetail.trim() !== "") {
      return maybeDetail;
    }
  }

  switch (status) {
    case 401:
      return "Сессия истекла";
    case 403:
      return "Доступ запрещён";
    case 429:
      return "Слишком много попыток. Подождите";
    case 500:
    case 502:
    case 503:
      return "Ошибка сервера";
  }

  if (!error.response) {
    return "Нет соединения с сервером";
  }

  return error.message || "Произошла ошибка";
};
