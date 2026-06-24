import { useFilters } from "../../hooks/useFilters"
import "./FiltersPanel.css"

export function FiltersPanel() {
    const { filters, updateFilter, resetFilters, showFavoritesOnly, handleFavoritesToggle } = useFilters()

    const activeFilterCount =
        Object.values(filters).filter((value) => value.trim() !== "").length +
        (showFavoritesOnly ? 1 : 0)

    return (
        <div className="filtersPanel">
            <div className="filtersPanel__header">
                <h3>Filters</h3>
                <p>Filter by manufacturer, price, mileage, year, or fuel type.</p>
            </div>
            <input
                type="text"
                placeholder="Manufacturer or model"
                value={filters.manufacturer}
                onChange={(e) => updateFilter("manufacturer", e.target.value)}
            />
            <div className="filtersPanel__grid">
                <input
                    type="number"
                    placeholder="Price min"
                    value={filters.priceMin}
                    onChange={(e) => updateFilter("priceMin", e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price max"
                    value={filters.priceMax}
                    onChange={(e) => updateFilter("priceMax", e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Mileage min"
                    value={filters.mileageMin}
                    onChange={(e) => updateFilter("mileageMin", e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Mileage max"
                    value={filters.mileageMax}
                    onChange={(e) => updateFilter("mileageMax", e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Year from"
                    value={filters.yearFrom}
                    onChange={(e) => updateFilter("yearFrom", e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Year to"
                    value={filters.yearTo}
                    onChange={(e) => updateFilter("yearTo", e.target.value)}
                />
                <select
                    value={filters.fuelType}
                    onChange={(e) => updateFilter("fuelType", e.target.value)}
                >
                    <option value="">All fuel types</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                </select>
            </div>

            <div className="filtersPanel__footer">
                <label className="checkbox">
                    <input
                        type="checkbox"
                        checked={showFavoritesOnly}
                        onChange={(e) => handleFavoritesToggle(e.target.checked)}
                    />
                    Show only favorites
                </label>

                <button type="button" className="filtersPanel__reset" onClick={resetFilters}>
                    Reset filters
                </button>

                <span className="filtersPanel__count">{activeFilterCount} active</span>
            </div>
        </div>
    )
}