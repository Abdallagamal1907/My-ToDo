import { Network, Palette, Code, Filter } from 'lucide-react';
import { FilterCategory, FilterStatus } from '../types';

interface FilterBarProps {
  categoryFilter: FilterCategory;
  statusFilter: FilterStatus;
  onCategoryChange: (category: FilterCategory) => void;
  onStatusChange: (status: FilterStatus) => void;
}

export function FilterBar({
  categoryFilter,
  statusFilter,
  onCategoryChange,
  onStatusChange
}: FilterBarProps) {
  const categories: { value: FilterCategory; label: string; icon: typeof Network }[] = [
    { value: 'all', label: 'الكل', icon: Filter },
    { value: 'networks', label: 'Networks & Linux', icon: Network },
    { value: 'design', label: 'Graphic Design', icon: Palette },
    { value: 'frontend', label: 'Frontend', icon: Code }
  ];

  const statuses: { value: FilterStatus; label: string }[] = [
    { value: 'all', label: 'الكل' },
    { value: 'completed', label: 'مكتملة' },
    { value: 'pending', label: 'قيد التنفيذ' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
            التصنيف
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => onCategoryChange(value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  categoryFilter === value
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
            الحالة
          </label>
          <div className="flex flex-wrap gap-2">
            {statuses.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => onStatusChange(value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  statusFilter === value
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
