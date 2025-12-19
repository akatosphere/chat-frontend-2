export type Result<T = void> = { success: true; data: T } | { success: false; error: string };

export type ValidationError = Record<string, string[]>;
export type MessageError = { message?: string; detail?: string };
