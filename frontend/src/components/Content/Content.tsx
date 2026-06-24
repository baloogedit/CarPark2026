import "./Content.css"
import { CarItem } from "../CarItem/CarItem"
import { useFilters } from "../../hooks/useFilters"
import { FiltersPanel } from "../FiltersPanel/FiltersPanel"
import { SortingPanel } from "../SortingPanel/SortingPanel"
import { useCarsList } from "../../hooks/useCarsList"
import { Pagination } from "../Pagination/Pagination"

export function Content() {
    const { filters, showFavoritesOnly } = useFilters()
    const { carsList, totalCars, isLoading, isError } = useCarsList()

    const activeFilterCount = Object.values(filters).filter((value) => value.trim() !== "").length + (showFavoritesOnly ? 1 : 0)

    
    return (
        <div className="Content">
            <header className="Content__hero">
                <div>
                    <p className="Content__eyebrow">CarPark 2026</p>
                    <h1>Preloved cars still in perfect condition, that are worth buying</h1>
                    <p className="Content__lede">
                        Browse vehicles, narrow the list by price, mileage, year, or manufacturer, and save your favorite car for later.
                    </p>
                </div>

                <div className="Content__stats">
                    <div className="Content__statCard">
                        <span className="Content__statValue">{totalCars}</span>
                        <span className="Content__statLabel">Total cars</span>
                    </div>
                    <div className="Content__statCard">
                        <span className="Content__statValue">{activeFilterCount}</span>
                        <span className="Content__statLabel">Active filters</span>
                    </div>
                </div>
            </header>

            <section className="Content__toolbar">
                <FiltersPanel />
                <SortingPanel />
            </section>

            {isLoading && <p>Data is loading...</p>}
            {isError && <p>Something went wrong</p>}

            {!isLoading && !isError && (
                <div className="CarList">
                    {/* Top Pagination */}
                    <Pagination />

                    <div className="CarList__grid">
                        {carsList.map((car) => (
                            <CarItem key={car.vin} car={car} />
                        ))}
                    </div>
                    
                    {/* Bottom Pagination */}
                    <Pagination />
                </div>
            )}
        </div>
    )
}