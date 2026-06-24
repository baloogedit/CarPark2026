import './Pagination.css'
import { useFilters } from "../../hooks/useFilters"
import { useCarsList } from "../../hooks/useCarsList"

export function Pagination() {
    const { page, setPage, limit } = useFilters()
    const { totalCars } = useCarsList()

    const totalPages = Math.ceil(totalCars / limit)

    if (totalPages <= 1) {
        return null
    }

    const handlePrev = () => {
        if (page > 1) setPage(page - 1)
    }

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1)
    }

    return (
        <div className="Pagination">
            <button 
                className="Pagination__button" 
                onClick={handlePrev} 
                disabled={page === 1}
                type="button"
            >
                Previous
            </button>
            
            <span className="Pagination__info">
                Page {page} of {totalPages}
            </span>

            <button 
                className="Pagination__button" 
                onClick={handleNext} 
                disabled={page === totalPages}
                type="button"
            >
                Next
            </button>
        </div>
    )
}