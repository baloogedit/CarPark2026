import { createContext, type Dispatch, type SetStateAction } from "react";

export type Filters = {
    manufacturer: string
}

export type FiltersContextType = {
    filters: Filters;
    page: number | undefined;
    setPage: Dispatch<SetStateAction<number | undefined>>;
    limit: number | undefined;
    setLimit: Dispatch<SetStateAction<number | undefined>>;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    updateFilter: (field: keyof Filters, value: string) => void;
    resetFilters: () => void;
    showFavoritesOnly: boolean;
    handleFavoritesToggle: (checked: boolean) => void;
}

export const FiltersContext = createContext<FiltersContextType | undefined>(undefined)
