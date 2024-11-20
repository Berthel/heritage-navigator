import { motion } from 'framer-motion'
import { Period, getLocalizedField } from "@/types/models";

interface PeriodBadgeProps {
  period: Period;
  selectedLanguage: 'da' | 'en' | 'pt';
  className?: string;
}

export const PeriodBadge = ({ period, selectedLanguage, className = '' }: PeriodBadgeProps) => {
  if (!period) return null;

  const localizedName = getLocalizedField(period.name, selectedLanguage);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`
        inline-flex items-center rounded-full px-3 py-1 text-sm font-medium
        ${className}
      `}
      style={{
        backgroundColor: `${period.color}20`,
        color: period.color
      }}
    >
      {localizedName}
    </motion.div>
  );
};
