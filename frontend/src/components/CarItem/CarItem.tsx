import type { Car } from "../../models/car"
import "./CarItem.css"
import { useFavorites } from "../../hooks/useFavorites"
import { IMG_BASE_URL } from "../../data/constants"
import {useBasket} from "../../contexts/BasketProvider"
import { useState } from 'react';
import { QuickViewModal } from '../QuickViewModal/QuickViewModal';

type Props = {
    car: Car
}

export function CarItem({ car }: Props) {
    
    const { toggleFavorite, isFavorite } = useFavorites()

    const { addToBasket } = useBasket();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <div className="carItem">
                <div className="imageContainer">
                    <img src={`${IMG_BASE_URL}/${car.image}`} className="carImage" alt={`${car.manufacturer} ${car.model}`} loading="lazy" />
                    <div className="priceBadge">{car.price} EUR</div>
                </div>
                <div className="CarItem__actions">
                    <button onClick={() => setIsModalOpen(true)} className="basketButton">
                        View Details
                    </button>
                    <div style={{ padding: "5px" }}/>
                    <button onClick={() => addToBasket(car)} className="basketButton">
                        Add to Basket
                    </button>
                    <button 
                        className={`favoriteIconBtn ${isFavorite(car) ? 'active' : ''}`} 
                        onClick={() => toggleFavorite(car)}
                        aria-label={isFavorite(car) ? "Remove from favorites" : "Add to favorites"}
                    >
                        {isFavorite(car) ? "★" : "☆"}
                    </button>
                </div>
                <div className="details">
                    <div className="titleRow">
                        <div>
                            <p className="eyebrow">{car.fuelType}</p>
                            <h2>{car.manufacturer} {car.model}</h2>
                        </div>
                    </div>
                    <div className="row"><div className="label">Construction Year: </div>{car.constructionYear}</div>
                    <div className="row"><div className="label">Fuel type: </div>{car.fuelType}</div>
                    <div className="row"><div className="label">Mileage: </div>{car.mileage} km</div>
                    <div className="row"><div className="label">Engine size: </div>{car.engineSize} cm3</div>
                    <div className="row"><div className="label">Power: </div>{car.power} CP</div>
                
                    
                </div>
            </div>
            <QuickViewModal 
                car={car} 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
        
    )
}