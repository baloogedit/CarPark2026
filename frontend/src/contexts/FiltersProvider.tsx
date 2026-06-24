
import { useState } from "react";
import type { PropsWithChildren } from "react";
import type { Filters, FiltersContextType, SortField } from "./FiltersContext";
import { FiltersContext } from "./FiltersContext";
import type { SortOrder } from "../data/car";

const defaultFilters: Filters = {
    manufacturer: "",
    priceMin: "",
    priceMax: "",
    mileageMin: "",
    mileageMax: "",
    yearFrom: "",
    yearTo: "",
    fuelType: "",
}

export function FiltersProvider({ children }: PropsWithChildren) {
    const [filters, setFilters] = useState<Filters>(defaultFilters)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(28)
    
    const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false)

    const [sort, setSort] = useState<SortField>("price")
    const [order, setOrder] = useState<SortOrder>("asc")

    const updateFilter = (field: keyof Filters, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }))
        setPage(1)
    }

    const resetFilters = () => {
        setFilters({ ...defaultFilters })
        setPage(1)
    }

    const handleFavoritesToggle = (checked: boolean) => {
        setShowFavoritesOnly(checked)
        setPage(1)
    }

    const context: FiltersContextType = {
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        page,
        setPage,
        limit,
        setLimit,
        sort,
        setSort,
        order,
        setOrder,
        showFavoritesOnly,
        handleFavoritesToggle,
    }

    return (
        <FiltersContext.Provider value={context}>
            {children}
        </FiltersContext.Provider>
    )
}