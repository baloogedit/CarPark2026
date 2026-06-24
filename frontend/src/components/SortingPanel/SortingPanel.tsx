import { useFilters } from '../../hooks/useFilters'
import './SortingPanel.css'

const SORT_FIELDS = [
    { value: 'price', label: 'Price' },
    { value: 'constructionYear', label: 'Year' },
    { value: 'mileage', label: 'Mileage' },
    { value: 'fuelType', label: 'Fuel type' },
]

const PAGE_SIZES = [10, 25, 50, 100]

export function SortingPanel() {
    const { sort, setSort, order, setOrder, limit, setLimit, setPage } = useFilters()

    const toggleOrder = () => {
        setOrder((prev) => prev === "asc" ? "desc" : "asc")
        setPage(1)
    }

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit)
        setPage(1)
    }

    const handleSortChange = (value: string) => {
        setSort(value as typeof sort)
        setPage(1)
    }

    return (
        <div className="SortingPanel">
            <label className="SortingPanel__field">
                <span className="SortingPanel__label">Sort by</span>
                <div className="SortingPanel__select">
                    <select
                        value={sort}
                        onChange={(e) => handleSortChange(e.target.value)}
                    >
                        {SORT_FIELDS.map((field) => (
                            <option key={field.value} value={field.value}>
                                {field.label}
                            </option>
                        ))}
                    </select>
                </div>
            </label>

            <button
                type="button"
                className="SortingPanel__order"
                onClick={toggleOrder}
                aria-label={order === "asc" ? "Sort ascending" : "Sort descending"}
                title={order === "asc" ? "Ascending" : "Descending"}
            >
                <span className={`SortingPanel__orderIcon${order === "desc" ? " SortingPanel__orderIcon--desc" : ""}`}>
                    {order === "asc" ? "↑" : "↓"}
                </span>
            </button>

            <label className="SortingPanel__field">
                <span className="SortingPanel__label">Cars per page</span>
                <div className="SortingPanel__select">
                    <select
                        value={limit}
                        onChange={(e) => handleLimitChange(Number(e.target.value))}
                    >
                        {PAGE_SIZES.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </label>
        </div>
    )
}