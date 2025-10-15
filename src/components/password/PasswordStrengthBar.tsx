import { strengthMap } from "./strength.helper";

type PasswordStrengthProps = {
  barWidth: string;
  barClass: string;
  label: string;
};

export default function PasswordStrengthBar({
  label,
  barClass,
  barWidth,
}: PasswordStrengthProps) {
  return (
    <div className="mt-2 mb-4">
      <div className="h-2 w-full rounded bg-gray-200 dark:bg-zinc-700">
        <div
          className={`h-2 rounded transition-all ${barClass} ${barWidth} `}
        ></div>
        <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
          {label}
        </p>
      </div>
    </div>
  );
}
