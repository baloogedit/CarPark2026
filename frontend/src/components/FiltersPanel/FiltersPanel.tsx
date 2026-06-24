import { useFilters } from "../../hooks/useFilters"
import "./FiltersPanel.css"

export function FiltersPanel() {
    const { filters, updateFilter, showFavoritesOnly, handleFavoritesToggle } = useFilters()

    return (
        <div className="filtersPanel">
            <div className="filtersPanel__header">
                <h3>Filters</h3>
                <p>Focus the list without losing the wider catalog.</p>
            </div>
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
