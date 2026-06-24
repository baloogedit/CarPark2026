import { useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import type { Car } from "../models/car";
import { CarListContext } from "./CarListContext";
import { useFilters } from "../hooks/useFilters";
import { useFavorites } from "../hooks/useFavorites";
import { getCars } from "../data/car";

const parseOptionalNumber = (value: string) => {
    if (value.trim() === "") {
        return undefined
    }

    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : undefined
}

const matchesRange = (value: number, min: number | undefined, max: number | undefined) => {
    if (min !== undefined && value < min) {
        return false
    }

    if (max !== undefined && value > max) {
        return false
    }

    return true
}

export function CarListProvider({ children }: PropsWithChildren) {

    const [allCars, setAllCars] = useState<Car[]>([])

    const { filters, page, limit, sort, order, showFavoritesOnly, setPage } = useFilters()
    const { favorites } = useFavorites()
    
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let cancelled = false

        const loadCars = async () => {
            setIsLoading(true)
            setIsError(false)

            try {
                const result = await getCars()

                if (!cancelled) {
                    setAllCars(result.items)
                }
            } catch {
                if (!cancelled) {
                    setIsError(true)
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false)
                }
            }
        }

        void loadCars()

        return () => {
            cancelled = true
        }
    }, [])

    const favoriteVins = useMemo(() => new Set(favorites.map((favorite) => favorite.vin)), [favorites])

    const filteredCars = useMemo(() => {
        const manufacturerQuery = filters.manufacturer.trim().toLowerCase()
        const priceMin = parseOptionalNumber(filters.priceMin)
        const priceMax = parseOptionalNumber(filters.priceMax)
        const mileageMin = parseOptionalNumber(filters.mileageMin)
        const mileageMax = parseOptionalNumber(filters.mileageMax)
        const yearFrom = parseOptionalNumber(filters.yearFrom)
        const yearTo = parseOptionalNumber(filters.yearTo)
        const fuelTypeQuery = filters.fuelType.trim()

        return allCars.filter((car) => {
            const matchesManufacturer =
                manufacturerQuery === "" ||
                car.manufacturer.toLowerCase().includes(manufacturerQuery) ||
                car.model.toLowerCase().includes(manufacturerQuery)

            const matchesPrice = matchesRange(car.price, priceMin, priceMax)
            const matchesMileage = matchesRange(car.mileage, mileageMin, mileageMax)
            const matchesYear = matchesRange(car.constructionYear, yearFrom, yearTo)
            const matchesFuelType = fuelTypeQuery === "" || car.fuelType === fuelTypeQuery
            const matchesFavorites = !showFavoritesOnly || favoriteVins.has(car.vin)

            return matchesManufacturer && matchesPrice && matchesMileage && matchesYear && matchesFuelType && matchesFavorites
        })
    }, [allCars, favoriteVins, filters, showFavoritesOnly])

    const sortedCars = useMemo(() => {
        const sorted = [...filteredCars]

        sorted.sort((left, right) => {
            const leftValue = left[sort]
            const rightValue = right[sort]

            if (typeof leftValue === "number" && typeof rightValue === "number") {
                return order === "asc" ? leftValue - rightValue : rightValue - leftValue
            }

            const leftText = String(leftValue).toLowerCase()
            const rightText = String(rightValue).toLowerCase()

            return order === "asc"
                ? leftText.localeCompare(rightText)
                : rightText.localeCompare(leftText)
        })

        return sorted
    }, [filteredCars, order, sort])

    const totalPages = Math.max(1, Math.ceil(sortedCars.length / limit))
    const safePage = Math.min(page, totalPages)

    useEffect(() => {
        if (page !== safePage) {
            setPage(safePage)
        }
    }, [page, safePage, setPage])

    const paginatedCars = useMemo(() => {
        return sortedCars.slice((safePage - 1) * limit, (safePage - 1) * limit + limit)
    }, [sortedCars, safePage, limit])

    const totalCars = sortedCars.length

    const context = {
        carsList: paginatedCars,
        totalCars,
        isError,
        isLoading
    }

    return (
        <CarListContext.Provider value={context}>
            {children}
        </CarListContext.Provider>
    )
}