import { Period } from '@/types/models';

interface PeriodFilterProps {
  periods: Period[];
  selectedPeriodId: string | null;
  onSelectPeriod: (periodId: string | null) => void;
  onClose: () => void;
}

export default function PeriodFilter({
  periods,
  selectedPeriodId,
  onSelectPeriod,
  onClose
}: PeriodFilterProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-xl p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Vælg periode</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            ✕
          </button>
        </div>
        
        {/* Alle perioder knap */}
        <button
          onClick={() => onSelectPeriod(null)}
          className={`w-full p-3 rounded-lg flex items-center justify-between ${
            selectedPeriodId === null ? 'bg-blue-50 text-blue-600' : 'bg-gray-50'
          }`}
        >
          <span className="font-medium">Alle perioder</span>
          {selectedPeriodId === null && (
            <span className="text-blue-600">✓</span>
          )}
        </button>

        {/* Liste over perioder */}
        <div className="space-y-2">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => onSelectPeriod(period.id)}
              className={`w-full p-3 rounded-lg flex items-center justify-between ${
                selectedPeriodId === period.id ? 'bg-blue-50 text-blue-600' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: period.color }}
                />
                <span className="font-medium">{period.name}</span>
              </div>
              {selectedPeriodId === period.id && (
                <span className="text-blue-600">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
