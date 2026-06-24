import type { Car } from "../../models/car"
import "./CarItem.css"
import { useFavorites } from "../../hooks/useFavorites"
import { IMG_BASE_URL } from "../../data/constants"

type Props = {
    car: Car
}

export function CarItem({ car }: Props) {
    const equipments = car.equipment
        .split(",")
        .map((equipment) => equipment.trim())
        .filter(Boolean)
    const { toggleFavorite, isFavorite } = useFavorites()

    return (
        <div className="carItem">
            <div className="imageContainer">
                <img src={`${IMG_BASE_URL}/${car.image}`} className="carImage" alt={`${car.manufacturer} ${car.model}`} loading="lazy" />
                <div className="priceBadge">{car.price} EUR</div>
            </div>
            <div className="details">
                <div className="titleRow">
                    <div>
                        <p className="eyebrow">{car.fuelType}</p>
                        <h2>{car.manufacturer} {car.model}</h2>
                    </div>
                </div>
                <div className="row"><div className="label">Manufacturer: </div> {car.manufacturer}</div>
                <div className="row"><div className="label">Model: </div>{car.model}</div>
                <div className="row"><div className="label">Construction Year: </div>{car.constructionYear}</div>
                <div className="row"><div className="label">Fuel type: </div>{car.fuelType}</div>
                <div className="row"><div className="label">Mileage: </div>{car.mileage} km</div>
                <div className="row"><div className="label">Engine size: </div>{car.engineSize} cm3</div>
                <div className="row"><div className="label">Power: </div>{car.power} CP</div>
                <br />
                <div className="row">
                    <div className="label">
                        Equipments:
                    </div>
                </div>
                <div className="row">
                    <ul className="list">
                        {equipments.slice(0, 9).map((equipment, index) => {
                            return <li key={index}>{equipment}</li>
                        })}
                    </ul>
                </div>
            </div>
            <div className="row">
                <button className="button" onClick={() => toggleFavorite(car)}>
                    {isFavorite(car) ? "Remove from favorites" : "Add to favorites"}
                </button>
            </div>
        </div>
    )
}