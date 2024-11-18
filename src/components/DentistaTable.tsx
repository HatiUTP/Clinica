import React from "react";
import { Dentista } from '../types';

export interface DentistaTableProps {
    dentistas: Dentista[];
    onEdit: (dentista: Dentista) => void;
    onDelete: (id: number) => void;
}

const DentistaTable: React.FC<DentistaTableProps> = ({ dentistas, onEdit, onDelete }) => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Especialidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {dentistas.map(dentista => (
                        <tr key={dentista.id}>
                            <td>{dentista.id}</td>
                            <td>{dentista.nombre}</td>
                            <td>{dentista.apellido}</td>
                            <td>{dentista.especialidad}</td>
                            <td>
                                <button onClick={() => onEdit(dentista)}>Editar</button>
                                <button onClick={() => onDelete(dentista.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DentistaTable;
