import "./Content.css"
import { CarItem } from "../CarItem/CarItem"
import { useFilters } from "../../hooks/useFilters"
import { FiltersPanel } from "../FiltersPanel/FiltersPanel"
import { SortingPanel } from "../SortingPanel/SortingPanel"
import { useCarsList } from "../../hooks/useCarsList"
import { Pagination } from "../Pagination/Pagination"

export function Content() {
    const { filters } = useFilters()
    const { carsList, isLoading, isError } = useCarsList()

    const filteredCarsList = carsList.filter((car) => {
        const filteredManufacturer = filters.manufacturer === "" ||
            car.manufacturer.toLowerCase().includes(filters.manufacturer.toLowerCase())

        return filteredManufacturer
    })

    return (
        <div className="Content">
            <header className="Content__hero">
                <div>
                    <p className="Content__eyebrow">CarPark 2026</p>
                    <h1>Curated cars with a cleaner, premium storefront.</h1>
                    <p className="Content__lede">
                        Browse vehicles, narrow the list by manufacturer, and keep the interface focused on the cars.
                    </p>
                </div>

                <div className="Content__stats">
                    <div className="Content__statCard">
                        <span className="Content__statValue">{filteredCarsList.length}</span>
                        <span className="Content__statLabel">Visible cars</span>
                    </div>
                    <div className="Content__statCard">
                        <span className="Content__statValue">{filters.manufacturer ? 1 : 0}</span>
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

                    <Pagination />

                    <div className="CarList__grid">
                        {filteredCarsList.map((car) => (
                            <CarItem key={car.vin} car={car} />
                        ))}
                    </div>

                    <Pagination />
                </div>
            )}
        </div>
    )
}