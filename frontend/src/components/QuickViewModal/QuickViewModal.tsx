import { useBasket } from '../../contexts/BasketProvider';
import { IMG_BASE_URL } from "../../data/constants"
import type { Car } from '../../models/car';
import './QuickViewModal.css';

interface QuickViewModalProps {
    car: Car | null;
    isOpen: boolean;
    onClose: () => void;
}

export function QuickViewModal({ car, isOpen, onClose }: QuickViewModalProps) {
    const { addToBasket } = useBasket();

    // 1. LÉPÉS: Biztonsági ellenőrzés (Ezt tedd legelőre!)
    // Ha a modal zárva van, vagy nincs autó (null), azonnal kilépünk és nem renderelünk semmit.
    if (!isOpen || !car) return null;

    // 2. LÉPÉS: Adatok feldolgozása
    // Ide jöhet az equipments feldolgozása, mert itt már 100% biztosak vagyunk benne, hogy a 'car' nem null.
    const equipments = car.equipment
        .split(",")
        .map((equipment) => equipment.trim())
        .filter(Boolean);

    return (
        <div className="Modal__overlay" onClick={onClose}>
            <div className="Modal__content" onClick={(e) => e.stopPropagation()}>
                <button className="Modal__close" onClick={onClose}>&times;</button>
                
                <div className="Modal__body">
                    <img src={`${IMG_BASE_URL}/${car.image}`} className="Modal__image" alt={`${car.manufacturer} ${car.model}`} loading="lazy" />
                    
                    
                    <div className="Modal__details">
                        <h2>{car.manufacturer} {car.model}</h2>
                        <p className="Modal__price">${car.price.toLocaleString()}</p>
                        
                        <ul className="Modal__specs">
                            <li><strong>Year:</strong> {car.constructionYear}</li>
                            <li><strong>Mileage:</strong> {car.mileage.toLocaleString()} km</li>
                            <li><strong>Fuel:</strong> {car.fuelType}</li>
                            <li><strong>Transmission:</strong> {car.gearbox}</li>
                            <li><strong>Engine Size:</strong> {car.engineSize} cm³</li>
                            <li><strong>Power:</strong> {car.power} CP</li>
                            <li><strong>VIN:</strong> {car.vin}</li>
                            <li><strong>Description:</strong> <br/>{car.description}</li>
                        </ul>
                        <br />
                        <div className="row">
                            <div className="label">
                                Equipments:
                            </div>
                        </div>
                        <div className="row">
                            <ul className="list equipmentList">
                                {equipments.slice(0, 9).map((equipment, index) => {
                                    return <li key={index}>{equipment}</li>
                                })}
                            </ul>
                        </div>
                        
                        <button 
                            className="basketButton" 
                            onClick={() => {
                                addToBasket(car);
                                onClose();
                            }}
                        >
                            Add to Basket
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}