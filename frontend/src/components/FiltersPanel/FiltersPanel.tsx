import { useState, useEffect } from "react"
import { useFilters } from "../../hooks/useFilters"
import "./FiltersPanel.css"

export function FiltersPanel() {
    const { filters, updateFilter, showFavoritesOnly, handleFavoritesToggle } = useFilters()
    
    // Manage input value locally
    const [localManufacturer, setLocalManufacturer] = useState(filters.manufacturer)

    // Keep local state in sync if filters are reset elsewhere
    useEffect(() => {
        setLocalManufacturer(filters.manufacturer)
    }, [filters.manufacturer])

    // Only apply the filter when Enter is pressed
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            updateFilter("manufacturer", localManufacturer)
        }
    }

    return (
        <div className="filtersPanel">
            <div className="filtersPanel__header">
                <h3>Filters</h3>
                <p>Focus the list without losing the wider catalog.</p>
            </div>
            <input
                type="text"
                placeholder="Manufacturer (Press Enter)"
                value={localManufacturer}
                onChange={(e) => setLocalManufacturer(e.target.value)}
                onKeyDown={handleKeyDown}
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