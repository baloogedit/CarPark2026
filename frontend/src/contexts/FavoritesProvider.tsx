import { useState, useEffect } from "react";
import type { PropsWithChildren } from "react";
import { FavoritesContext } from "./FavoritesContext";
import { getFavorites, createFavorite, deleteFavorite } from "../data/favorites";
import type { Favorite } from "../models/favorites";
import type { Car } from "../models/car";

export function FavoritesProvider({ children }: PropsWithChildren) {
    const [favorites, setFavorites] = useState<Favorite[]>([]);

    useEffect(() => {
        // Fetch favorites once when the provider mounts
        getFavorites().then(setFavorites).catch(console.error);
    }, []);

    const isFavorite = (car: Car) => {
        return favorites.some(fav => fav.vin === car.vin);
    };

    const toggleFavorite = async (car: Car) => {
        if (isFavorite(car)) {
            // Remove logic
            const favToDelete = favorites.find(fav => fav.vin === car.vin);
            if (favToDelete) {
                try {
                    await deleteFavorite(favToDelete);
                    setFavorites(prev => prev.filter(f => f.vin !== car.vin));
                } catch (e) {
                    console.error("Failed to delete favorite", e);
                }
            }
        } else {
            // Add logic
            try {
                // Cast Car to Favorite assuming they share the necessary structure
                const newFav = await createFavorite(car as unknown as Favorite);
                setFavorites(prev => [...prev, newFav]);
            } catch (e) {
                console.error("Failed to add favorite", e);
            }
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}