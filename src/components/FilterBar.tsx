const statuses = ['all', 'want-to-read', 'reading', 'completed'] as const
const statusLabel: Record<string, string> = {
  'all': 'All',
  'want-to-read': 'Want to Read',
  'reading': 'Reading',
  'completed': 'Completed',
}

interface Props {
  search: string
  filter: string
  sortAZ: boolean
  view: 'grid' | 'list'
  onSearch: (v: string) => void
  onFilter: (v: string) => void
  onToggleSort: () => void
  onToggleView: () => void
}

export default function FilterBar({ search, filter, sortAZ, view, onSearch, onFilter, onToggleSort, onToggleView }: Props) {
  return (
    <div className="filter-bar" role="search">

      <div className="filter-group">
        <label htmlFor="book-search" className="filter-group-label">Filters</label>
        <input
          id="book-search"
          type="search"
          placeholder="Search by title or author..."
          value={search}
          onChange={e => onSearch(e.target.value)}
          aria-label="Search books by title or author"
        />
        <div className="filter-tabs" role="group" aria-label="Filter by status">
          {statuses.map(s => (
            <button
              key={s}
              className={filter === s ? 'active' : ''}
              onClick={() => onFilter(s)}
              aria-pressed={filter === s}
            >
              {statusLabel[s]}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-group-label" id="sort-label">Sort by</span>
        <div className="filter-tabs" role="group" aria-labelledby="sort-label">
          <button
            className={sortAZ ? 'active' : ''}
            onClick={() => { if (!sortAZ) onToggleSort() }}
            aria-pressed={sortAZ}
          >
            A–Z
          </button>
          <button
            className={!sortAZ ? 'active' : ''}
            onClick={() => { if (sortAZ) onToggleSort() }}
            aria-pressed={!sortAZ}
          >
            Z–A
          </button>
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-group-label" id="view-label">View</span>
        <div className="filter-tabs" role="group" aria-labelledby="view-label">
          <button
            className={view === 'grid' ? 'active' : ''}
            onClick={() => { if (view !== 'grid') onToggleView() }}
            aria-pressed={view === 'grid'}
          >
            Grid
          </button>
          <button
            className={view === 'list' ? 'active' : ''}
            onClick={() => { if (view !== 'list') onToggleView() }}
            aria-pressed={view === 'list'}
          >
            List
          </button>
        </div>
      </div>

    </div>
  )
}
