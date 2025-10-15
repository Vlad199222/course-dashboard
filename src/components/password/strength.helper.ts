export type StrengthMeta = {
  label: string;
  barWidth: string;
  barClass: string;
};

export const strengthMap: Record<number, StrengthMeta> = {
  0: { label: "Дуже слабкий", barWidth: "w-1/5", barClass: "bg-red-500" },
  1: { label: "Cлабкий", barWidth: "w-2/5", barClass: "bg-orange-500" },
  2: { label: "Cередній", barWidth: "w-3/5", barClass: "bg-yellow-500" },
  3: { label: "Надійний", barWidth: "w-4/5", barClass: "bg-blue-500" },
  4: { label: "Дуже надійний", barWidth: "w-full", barClass: "bg-green-600" },
};
