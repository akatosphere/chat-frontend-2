export type WSStatusResponse = "OK" | "ERROR";

export type WSBaseResponse<T = unknown> = {
  action: string;
  request_uid?: string;
  status?: WSStatusResponse;
  error?: string;
  object: T;
};
