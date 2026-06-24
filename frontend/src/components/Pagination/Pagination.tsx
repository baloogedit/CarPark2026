import './Pagination.css'
import { useFilters } from "../../hooks/useFilters"
import { useCarsList } from "../../hooks/useCarsList"

export function Pagination() {
const { page, setPage, limit } = useFilters()
    const { totalCars } = useCarsList()

    // Calculate total pages based on the total cars and the limit per page
    const totalPages = Math.ceil(totalCars / limit)

    // Hide the pagination entirely if there's only enough data for 1 page
    if (totalPages <= 1) {
        return null; 
    }

    const handlePrev = () => {
        if (page > 1) setPage(page - 1)
    }

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1)
    }

    return (
        <div className="pagination">
            <button 
                className="pagination__btn" 
                onClick={handlePrev} 
                disabled={page === 1}
            >
                Previous
            </button>
            
            <span className="pagination__info">
                Page {page} of {totalPages}
            </span>

            <button 
                className="pagination__btn" 
                onClick={handleNext} 
                disabled={page === totalPages}
            >
                Next
            </button>
        </div>
    )
}