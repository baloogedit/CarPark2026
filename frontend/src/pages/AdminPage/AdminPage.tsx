import { useState } from 'react';
import { useCarsList } from '../../hooks/useCarsList';
import { IMG_BASE_URL } from '../../data/constants';
import { EditCarModal } from '../../components/EditCarModal/EditCarModal';
import { AddCarModal } from '../../components/AddCarModal/AddCarModal';
import type { Car } from '../../models/car';
import './AdminPage.css';

export function AdminPage() {
    const { carsList, isLoading, isError, deleteCarContext, updateCarContext, addCarContext } = useCarsList();
    const [editingCar, setEditingCar] = useState<Car | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleDelete = async (vin: string) => {
        if (window.confirm(`Biztosan törölni szeretnéd ezt az autót? (VIN: ${vin})`)) {
            await deleteCarContext(vin);
        }
    };

    const handleEdit = (car: Car) => {
        setEditingCar(car);
    };

    const handleAdd = () => {
        setIsAddModalOpen(true);
        
    };

    return (
        <div className="AdminPage">
            <header className="AdminPage__header">
                <div>
                    <h1 className="AdminPage__title">Admin Dashboard</h1>
                    <p className="AdminPage__subtitle">Manage your car inventory</p>
                </div>
                <button onClick={handleAdd} className="AdminPage__addBtn">
                    + Add New Car
                </button>
            </header>

            {isLoading && <p>Loading inventory...</p>}
            {isError && <p>Error loading inventory.</p>}

            {!isLoading && !isError && (
                <div className="AdminPage__tableWrapper">
                    <table className="AdminPage__table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>VIN</th>
                                <th>Manufacturer</th>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Price (EUR)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carsList.map((car) => (
                                <tr key={car.vin}>
                                    <td>
                                        <img 
                                            src={`${IMG_BASE_URL}/${car.image}`} 
                                            alt={car.model} 
                                            className="AdminPage__img" 
                                        />
                                    </td>
                                    <td className="AdminPage__vin">{car.vin}</td>
                                    <td>{car.manufacturer}</td>
                                    <td>{car.model}</td>
                                    <td>{car.constructionYear}</td>
                                    <td className="AdminPage__price">
                                        {car.price.toLocaleString()}
                                    </td>
                                    <td>
                                        <div className="AdminPage__actions">
                                            <button 
                                                onClick={() => handleEdit(car)} 
                                                className="AdminPage__btn AdminPage__btn--edit"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(car.vin)} 
                                                className="AdminPage__btn AdminPage__btn--delete"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <EditCarModal 
                car={editingCar} 
                isOpen={editingCar !== null} 
                onClose={() => setEditingCar(null)}
                onSave={updateCarContext}
            />

            <AddCarModal 
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={addCarContext}
            />
        </div>
    );
}