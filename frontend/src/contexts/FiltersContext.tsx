import { createContext, type Dispatch, type SetStateAction } from "react";
import type { SortOrder } from "../data/car";

export type SortField = "price" | "constructionYear" | "mileage" | "fuelType";

export type Filters = {
    manufacturer: string;
    priceMin: string;
    priceMax: string;
    mileageMin: string;
    mileageMax: string;
    yearFrom: string;
    yearTo: string;
    fuelType: string;
}

export type FiltersContextType = {
    filters: Filters;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    limit: number;
    setLimit: Dispatch<SetStateAction<number>>;
    setFilters: Dispatch<SetStateAction<Filters>>;
    updateFilter: (field: keyof Filters, value: string) => void;
    resetFilters: () => void;
    showFavoritesOnly: boolean;
    handleFavoritesToggle: (checked: boolean) => void;

    sort: SortField;
    setSort: Dispatch<SetStateAction<SortField>>;
    order: SortOrder;
    setOrder: Dispatch<SetStateAction<SortOrder>>;
}

export const FiltersContext = createContext<FiltersContextType | undefined>(undefined)
