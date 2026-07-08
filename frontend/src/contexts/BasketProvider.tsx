import { createContext, useState, useEffect,  useContext, type ReactNode } from 'react';
import type { Car } from '../models/car';

interface BasketItem {
    car: Car;
    quantity: number;
}

interface BasketContextType {
    basketItems: BasketItem[];
    addToBasket: (car: Car) => void;
    removeFromBasket: (vin: string) => void;
    basketTotal: number;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

const BASKET_STORAGE_KEY = 'carpark_basket';

export function BasketProvider({ children }: { children: ReactNode }) {
    
    // first load from local storage if available (initial state)
    const [basketItems, setBasketItems] = useState<BasketItem[]>(() => {
        const savedBasket = localStorage.getItem(BASKET_STORAGE_KEY);
        if (savedBasket) {
            try {
                const parsed = JSON.parse(savedBasket);
                // Csak akkor fogadja el, ha tényleg egy tömb, különben üres tömböt ad
                return Array.isArray(parsed) ? parsed : []; 
            } catch (error) {
                console.error("Failed to parse basket from local storage:", error);
                return [];
            }
        }
        return [];
    });

    // basket item change -> save to local stoage (sync)
    useEffect(() => {
        localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(basketItems));
    }, [basketItems]);

    const addToBasket = (car: Car) => {
        setBasketItems((prev) => {
            const existingItem = prev.find(item => item.car.vin === car.vin);
            if (existingItem) {
                // prevent duplicates
                return prev; 
            }
            return [...prev, { car, quantity: 1 }];
        });
    };

    const removeFromBasket = (vin: string) => {
        setBasketItems((prev) => prev.filter(item => item.car.vin !== vin));
    };

    const basketTotal = Array.isArray(basketItems) 
        ? basketItems.reduce((total, item) => total + item.car.price, 0)
        : 0;

    return (
        <BasketContext.Provider value={{ basketItems, addToBasket, removeFromBasket, basketTotal }}>
            {children}
        </BasketContext.Provider>
    );
}

// Custom hook for easy access
export function useBasket() {
    const context = useContext(BasketContext);
    if (context === undefined) {
        throw new Error('useBasket must be used within a BasketProvider');
    }
    return context;
}