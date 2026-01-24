export type WSStatusResponse = "OK" | "ERROR";

export type WSStatus = "idle" | "connecting" | "connected" | "reconnecting" | "closed";

export type WSBaseResponse<T = unknown> = {
  action: string;
  request_uid?: string;
  status?: WSStatusResponse;
  error?: string;
  object: T;
};

export type WSHandler<T = unknown> = (data: WSBaseResponse<T>) => void;
