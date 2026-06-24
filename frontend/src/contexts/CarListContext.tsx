import { createContext } from "react";
import type { Car } from "../models/car";

type CarListContextType = {
    carsList: Car[];
    totalCars: number;
    isError: boolean;
    isLoading: boolean;
}

export const CarListContext = createContext<CarListContextType | undefined>(undefined)
