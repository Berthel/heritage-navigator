import { Period } from '@/types/models';
import { X } from 'lucide-react';

interface FilteredLayoutProps {
  selectedPeriod: Period | null;
  onClearFilter: () => void;
  children: React.ReactNode;
}

export default function FilteredLayout({
  selectedPeriod,
  onClearFilter,
  children
}: FilteredLayoutProps) {
  if (!selectedPeriod) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Filter header */}
      <div className="bg-white border-b px-4 py-2 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: selectedPeriod.color }}
            />
            <span className="text-sm font-medium">
              {selectedPeriod.name}
            </span>
          </div>
          <button
            onClick={onClearFilter}
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="Fjern filter"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
