import axios from "axios";
import { cookies } from "next/headers";

import { API_CONFIG } from "./base";

// Это функция-фабрика. На сервере мы создаем новый инстанс на каждый запрос,
// чтобы избежать утечки данных между разными пользователями.
export const getApiServer = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const instance = axios.create(API_CONFIG);

  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return instance;
};
