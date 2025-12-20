import { useState } from "react";
import { pluralize } from "@/shared/lib/pluralize";
import { useRouter } from "next/navigation";

type onCompleteResult = { success: boolean };

type UseVerificationUIOptions = {
  onComplete: (code: string) => Promise<onCompleteResult>;
  attemptsLeft: number;
}

export const useVerificationUI = ({
  onComplete,
  attemptsLeft,
}: UseVerificationUIOptions) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleComplete = async (code: string) => {
    setLoading(true);
    const res = await onComplete(code);
    if (!res?.success && attemptsLeft > 1)
      setError(
        `Код введен неверно. Осталось ${attemptsLeft - 1} ${pluralize(
          attemptsLeft - 1,
          "попытка",
          "попытки",
          "попыток"
        )}.`
      );
    else if (res.success) {
      setError("");
      router.push("/auth/user");
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
