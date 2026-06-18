import type { Car } from "../models/car"

export const useFavorites = () => {
    
    return {
        favorites: [],
        toggleFavorite: (car: Car) => {},
        isFavorite: (car: Car) => false
    }
}