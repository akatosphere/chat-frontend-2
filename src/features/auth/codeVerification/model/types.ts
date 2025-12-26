export type VerificationResult =
  | { success: true; is_filled: boolean }
  | {
      success: false;
      error?: string;
      isCodeExpired?: boolean;
    };
