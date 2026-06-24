
import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { getCars, type GetCarsParams } from "../data/car";
import type { Car } from "../models/car";
import { CarListContext } from "./CarListContext";
import { useFilters } from "../hooks/useFilters";


export function CarListProvider({ children }: PropsWithChildren) {

    const [carsList, setCarsList] = useState<Car[]>([])

    const { filters, page, limit } = useFilters()
    
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let cancelled = false

        const loadCars = async () => {
            setIsLoading(true)
            setIsError(false)

            try {
                const params: GetCarsParams = {
                    filters,
                    page,
                    limit,
                }

                const result = await getCars(params)

                if (!cancelled) {
                    setCarsList(result.items)
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
    }, [filters, page, limit])

    const context = {
        carsList,
        isError,
        isLoading
    }

    return (
        <CarListContext.Provider value={context}>
            {children}
        </CarListContext.Provider>
    )
}