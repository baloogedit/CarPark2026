import { createContext } from "react";
import type { Car } from "../models/car";

export interface CarListContextType {
    carsList: Car[];
    totalCars: number;
    isError: boolean;
    isLoading: boolean;
    
    deleteCarContext: (vin: string) => Promise<void>;
    updateCarContext: (vin: string, updatedData: Partial<Car>) => Promise<void>;
    addCarContext: (newCar: Car) => Promise<void>;

}

export const CarListContext = createContext<CarListContextType | undefined>(undefined);