import { FilterSelect } from './FilterSelect';
import { JobFilters } from '../types/jobs';

// These options could come from the API in a real app.
// For now they are static constants.
const CATEGORY_OPTIONS = [
  { label: 'Engineering', value: 'Engineering' },
  { label: 'Design', value: 'Design' },
];

const TYPE_OPTIONS = [
  { label: 'Full-time', value: 'Full-time' },
  { label: 'Contract', value: 'Contract' },
  { label: 'Part-time', value: 'Part-time' },
];

interface FiltersSidebarProps {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
}

export function FiltersSidebar({ filters, onChange }: FiltersSidebarProps) {
  const hasActiveFilters = filters.category || filters.type;

  return (
    <aside className="filters-sidebar">
      <h2 className="filters-title">Filters</h2>

      <FilterSelect
        label="Category"
        value={filters.category}
        options={CATEGORY_OPTIONS}
        onChange={(value) => onChange({ ...filters, category: value })}
      />

      <FilterSelect
        label="Job Type"
        value={filters.type}
        options={TYPE_OPTIONS}
        onChange={(value) => onChange({ ...filters, type: value })}
      />

      {hasActiveFilters && (
        <button
          className="reset-btn"
          onClick={() => onChange({ category: '', type: '' })}
        >
          ✕ Clear Filters
        </button>
      )}
    </aside>
  );
}
