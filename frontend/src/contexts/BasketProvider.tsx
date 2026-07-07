import { createContext, useState,  useContext, type ReactNode } from 'react';
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

export function BasketProvider({ children }: { children: ReactNode }) {
    const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

    const addToBasket = (car: Car) => {
        setBasketItems((prev) => {
            const existingItem = prev.find(item => item.car.vin === car.vin);
            if (existingItem) {
                // prevent adding duplicates.
                return prev; 
            }
            return [...prev, { car, quantity: 1 }];
        });
    };

    const removeFromBasket = (vin: string) => {
        setBasketItems((prev) => prev.filter(item => item.car.vin !== vin));
    };

    const basketTotal = basketItems.reduce((total, item) => total + item.car.price, 0);

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