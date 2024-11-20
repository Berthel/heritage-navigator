'use client';

import { Period } from '@/types/models';
import { Button } from '@/components/ui/button';

interface PeriodFilterProps {
  periods: Period[];
  selectedPeriod: string | null;
  onPeriodSelect: (periodId: string | null) => void;
  selectedLanguage: 'da' | 'en' | 'pt';
}

export default function PeriodFilter({
  periods,
  selectedPeriod,
  onPeriodSelect,
  selectedLanguage
}: PeriodFilterProps) {
  const allPeriodsText = {
    da: 'Alle perioder',
    en: 'All periods',
    pt: 'Todos os períodos'
  };

  return (
    <div className="flex gap-2 px-4 py-2 overflow-x-auto scrollbar-hide">
      <Button
        variant={selectedPeriod === null ? "secondary" : "outline"}
        onClick={() => onPeriodSelect(null)}
        size="sm"
        className="whitespace-nowrap min-w-fit rounded-full"
      >
        {allPeriodsText[selectedLanguage]}
      </Button>
      {periods.sort((a, b) => a.order - b.order).map((period) => (
        <Button
          key={period.id}
          variant={selectedPeriod === period.id ? "secondary" : "outline"}
          onClick={() => onPeriodSelect(period.id)}
          size="sm"
          className="whitespace-nowrap min-w-fit rounded-full"
          style={{
            borderColor: period.color,
            color: selectedPeriod === period.id ? '#fff' : period.color,
            backgroundColor: selectedPeriod === period.id ? period.color : 'transparent'
          }}
        >
          {period.name[selectedLanguage]}
        </Button>
      ))}
    </div>
  );
}
