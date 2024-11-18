import React, {useState, useEffect} from "react";
import { Dentista } from '../types';

export interface DentistaFormProps {
    onSubmit: (data: Omit<Dentista, 'id'>) => void;
    onCancel?: () => void;
    initialData?: Dentista;
}

const DentistaForm: React.FC<DentistaFormProps> = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState<Omit<Dentista, 'id'>>({
        nombre: initialData?.nombre || '',
        apellido: initialData?.apellido || '',
        especialidad: initialData?.especialidad || '',
    });

    useEffect(() => {
        setFormData({
            nombre: initialData?.nombre || '',
            apellido: initialData?.apellido || '',
            especialidad: initialData?.especialidad || '',
        });
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const resetForm = () => {
        setFormData({
            nombre: '',
            apellido: '',
            especialidad: '',
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        resetForm();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="apellido">Apellido:</label>
                <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="especialidad">Especialidad:</label>
                <input
                    type="text"
                    id="especialidad"
                    name="especialidad"
                    value={formData.especialidad}
                    onChange={handleChange}
                />
            </div>
            <div>
                <button type="submit">Guardar</button>
                {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
            </div>
        </form>
    );
};

export default DentistaForm;