import type { Car } from "../models/car"

export const useFavorites = () => {
    
    return {
        favorites: [],
        toggleFavorite: (_car: Car) => {},
        isFavorite: (_car: Car) => false
    }
}