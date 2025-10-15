import zxcvbn from "zxcvbn";
import { strengthMap } from "./strength.helper";
import { useMemo } from "react";

export type PasswordStrength = {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  suggestions: string[];
  barClass: string;
  barWidth: string;
};

export function usePasswordStrength(password: string): PasswordStrength {
  const res = useMemo(() => zxcvbn(password || ""), [password]);

  // meta бере число від 0 і до 4 в strengthMap
  const meta = strengthMap[res.score];

  return {
    score: res.score as 0 | 1 | 2 | 3 | 4,
    label: meta.label,
    suggestions: res.feedback.suggestions ?? [],
    barClass: meta.barClass,
    barWidth: meta.barWidth,
  };
}
