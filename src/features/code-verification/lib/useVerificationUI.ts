import { useState } from "react";
import { pluralize } from "@/shared/lib/pluralize";

interface UseVerificationUIOptions {
  onComplete: (code: string) => { success: boolean };
  attemptsLeft: number;
}

export const useVerificationUI = ({
  onComplete,
  attemptsLeft,
}: UseVerificationUIOptions) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // async, когда добавим api. добавить обработку ошибок.
  const handleComplete = (code: string) => {
    setLoading(true);
    const res = onComplete(code);
    if (!res.success && attemptsLeft > 1)
      setError(
        `Код введен неверно. Осталось ${attemptsLeft - 1} ${pluralize(
          attemptsLeft - 1,
          "попытка",
          "попытки",
          "попыток"
        )}.`
      );
    else {
      setError("");
      // логика при успехе(редирект)
    }
    setLoading(false);
    return res;
  };

  return {
    error,
    loading,
    handleComplete,
    setError,
  };
};
