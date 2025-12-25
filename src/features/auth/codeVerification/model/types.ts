export type VerificationResult =
  | { success: true }
  | {
      success: false;
      error?: string;
      isCodeExpired?: boolean;
    };
