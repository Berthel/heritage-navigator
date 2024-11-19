import { Period, getLocalizedField } from "@/types/models";

interface PeriodBadgeProps {
  period: Period;
  selectedLanguage: string;
}

export const PeriodBadge = ({ period, selectedLanguage }: PeriodBadgeProps) => {
  if (!period) return null;

  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
      style={{
        backgroundColor: `${period.color}20`,
        color: period.color
      }}
    >
      {getLocalizedField(period.name, selectedLanguage)}
    </span>
  );
};
