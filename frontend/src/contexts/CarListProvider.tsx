
import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { getCars, type GetCarsParams } from "../data/car";
import type { Car } from "../models/car";
import { CarListContext } from "./CarListContext";
import { useFilters } from "../hooks/useFilters";
import { useFavorites } from "../hooks/useFavorites";


export function CarListProvider({ children }: PropsWithChildren) {

    const [carsList, setCarsList] = useState<Car[]>([])
    const [totalCars, setTotalCars] = useState<number>(0)

   const { filters, page, limit, showFavoritesOnly } = useFilters() 
    const { favorites } = useFavorites()

    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let cancelled = false

        const loadCars = async () => {
            setIsLoading(true)
            setIsError(false)

            try {
                if (showFavoritesOnly && favorites.length === 0) {
                    if (!cancelled) {
                        setCarsList([])
                        setTotalCars(0)
                        setIsLoading(false)
                    }
                    return
                }

                const params: GetCarsParams = {
                    filters,
                    page,
                    limit,
                }

                if (showFavoritesOnly) {
                    params.vins = favorites.map(f => f.vin)
                }

                const result = await getCars(params)

                if (!cancelled) {
                    setCarsList(result.items)
                    setTotalCars(result.total || 0);
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
    }, [filters, page, limit, showFavoritesOnly, favorites])

    const context = {
        carsList,
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