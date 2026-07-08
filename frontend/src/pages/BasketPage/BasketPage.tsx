import { useBasket } from '../../contexts/BasketProvider'; 
import { IMG_BASE_URL } from '../../data/constants';
import './BasketPage.css';
import type { Car } from '../../models/car';
import { useState } from 'react';
import { QuickViewModal } from '../../components/QuickViewModal/QuickViewModal';

export function BasketPage() {
    const { basketItems, removeFromBasket, basketTotal } = useBasket();
    const [viewingCar, setViewingCar] = useState<Car | null>(null);

    return (
        <div className="BasketPage">
            <header className="BasketPage__header">
                <h1 className="headerText">Your Basket</h1>
            </header>

            {(!basketItems || basketItems.length === 0) ? (
                <p>Your basket is empty. Go explore some cars!</p>
            ) : (
                <div className="BasketPage__content">
                    <ul className="BasketPage__list">
                        {basketItems?.map((item) => (
                            <li key={item.car.vin} className="BasketPage__item">
                                <div className="BasketPage__image">
                                    <img src={`${IMG_BASE_URL}/${item.car.image}`} className="carImage" alt={`${item.car.manufacturer} ${item.car.model}`} loading="lazy" />
                                </div>
                                <div className="BasketPage__details">
                                    <h3>
                                        {item.car.manufacturer} 
                                        <br></br>
                                        {item.car.model}
                                    </h3>
                                    <p>VIN: {item.car.vin}</p>
                                </div>
                                <div className="BasketPage__price">
                                    ${item.car.price.toLocaleString()}
                                </div>
                                <button 
                                    onClick={() => setViewingCar(item.car)}
                                    className="btn btn--danger"
                                >
                                    View
                                </button>
                                <button 
                                    onClick={() => removeFromBasket(item.car.vin)}
                                    className="btn btn--danger"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="BasketPage__summary">
                        <h2>Summary</h2>
                        <div className="BasketPage__total">
                            <span>Total:</span>
                            <span>${basketTotal.toLocaleString()}</span>
                        </div>
                        <button className="btn btn--checkout">Proceed to Checkout</button>
                    </div>
                </div>
            )}
            
            <QuickViewModal 
                car={viewingCar} 
                isOpen={viewingCar !== null} 
                onClose={() => setViewingCar(null)} 
            />
        </div>
    );
}