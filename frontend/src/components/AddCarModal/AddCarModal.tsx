import { useState } from 'react';
import type { Car } from '../../models/car';
import './AddCarModal.css';

interface AddCarModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (newCar: Car) => Promise<void>;
}

export function AddCarModal({ isOpen, onClose, onAdd }: AddCarModalProps) {
    
    const [formData, setFormData] = useState<Partial<Car>>({
        image: 'image.png', //image placeholder
    });
    const [isSaving, setIsSaving] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        const parsedValue = type === 'number' ? Number(value) : value;

        setFormData(prev => ({
            ...prev,
            [name]: parsedValue
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        
        await onAdd(formData as Car);
        setIsSaving(false);
        onClose();
    };

    return (
        <div className="Modal__overlay" onClick={onClose}>
            <div className="AddCarModal" onClick={(e) => e.stopPropagation()}>
                <div className="AddCarModal__header">
                    <h2>Add New Car</h2>
                    <button className="Modal__close" onClick={onClose}>&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} className="AddCarModal__form">
                    
                    <div className="AddCarModal__grid">
                        
                        <div className="form-group">
                            <label>VIN (Unique ID)</label>
                            <input type="text" name="vin" value={formData.vin || ''} onChange={handleChange} required placeholder="pl. WBA00000001" />
                        </div>

                        <div className="form-group">
                            <label>Manufacturer</label>
                            <input type="text" name="manufacturer" value={formData.manufacturer || ''} onChange={handleChange} required />
                        </div>
                        
                        <div className="form-group">
                            <label>Model</label>
                            <input type="text" name="model" value={formData.model || ''} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Price (EUR)</label>
                            <input type="number" name="price" value={formData.price || 0} onChange={handleChange} required />
                        </div>
                        
                        <div className="form-group">
                            <label>Mileage (km)</label>
                            <input type="number" name="mileage" value={formData.mileage || 0} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Construction Year</label>
                            <input type="number" name="constructionYear" value={formData.constructionYear || 0} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Transmission</label>
                            <select name="transmission" value={formData.gearbox || ''} onChange={handleChange} required>
                                <option value="Manual">Manual</option>
                                <option value="Automatic">Automatic</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Engine Size (cm³)</label>
                            <input type="number" name="engineSize" value={formData.engineSize || 0} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Power (CP)</label>
                            <input type="number" name="power" value={formData.power || 0} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Fuel Type</label>
                            <select name="fuelType" value={formData.fuelType || ''} onChange={handleChange} required>
                                <option value="Gasoline">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group AddCarModal__fullwidth">
                        <label>Description</label>
                        <textarea 
                            name="description"
                            value={formData.description || ''} 
                            onChange={handleChange} 
                            rows={3} 
                        />
                    </div>

                    <div className="form-group AddCarModal__fullwidth">
                        <label>Equipments (comma separated)</label>
                        <textarea 
                            name="equipment" 
                            value={formData.equipment || ''} 
                            onChange={handleChange} 
                            rows={3} 
                        />
                    </div>

                    <div className="form-group AddCarModal__fullwidth">
                        <label>Image Filename (e.g. audi-q7.png)</label>
                        <input type="text" name="image" value={formData.image || ''} onChange={handleChange} />
                    </div>
                    
                    <div className="AddCarModal__actions">
                        <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
                        <button type="submit" className="btn-save" disabled={isSaving}>
                            {isSaving ? 'Adding...' : 'Add Car'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}