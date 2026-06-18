import { useFilters } from "../../hooks/useFilters"
import "./FiltersPanel.css"

export function FiltersPanel() {
    const { filters, updateFilter, showFavoritesOnly, handleFavoritesToggle } = useFilters()

    return (
        <div className="filtersPanel">
            <h3>Filters Cars</h3>
            <input
                type="text"
                placeholder="Manufacturer"
                value={filters.manufacturer}
                onChange={(e) => updateFilter("manufacturer", e.target.value)}
            />
            <label className="checkbox">
                <input
                    type="checkbox"
                    checked={showFavoritesOnly}
                    onChange={(e) => handleFavoritesToggle(e.target.checked)}
                />
                Show only favorites
            </label>
        </div>
    )
}
