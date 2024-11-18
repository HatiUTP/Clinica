import { useState, useEffect } from 'react';
import axios from 'axios';
import { Dentista } from './types';
import DentistaTable from './components/DentistaTable';
import DentistaForm from './components/DentistaForm';
import './App.css';

// Update API_URL to match vite.config.ts proxy settings
const API_URL = '/clinicadental';

function App() {
  const [dentistas, setDentistas] = useState<Dentista[]>([]);
  const [selectedDentista, setSelectedDentista] = useState<Dentista | undefined>();

  useEffect(() => {
    fetchDentistas();
  }, []);

  const fetchDentistas = async () => {
    try {
      const response = await axios.get<Dentista[]>(`${API_URL}/dentistas`);
      setDentistas(response.data);
    } catch (error: any) {
      alert('Error al cargar dentistas: ' + error.message);
    }
  };

  const handleCreate = async (data: Omit<Dentista, 'id'>) => {
    try {
      const response = await axios.post<Dentista>(`${API_URL}/dentistas`, data);
      setDentistas([...dentistas, response.data]);
      setSelectedDentista(undefined);
      alert('Dentista creado exitosamente');
    } catch (error: any) {
      alert('Error al crear dentista: ' + error.message);
    }
  };

  const handleUpdate = async (data: Omit<Dentista, 'id'>) => {
    if (!selectedDentista) return;
    try {
      const response = await axios.put<Dentista>(
        `${API_URL}/dentistas/${selectedDentista.id}`,
        data
      );
      setDentistas(dentistas.map(d => 
        d.id === selectedDentista.id ? response.data : d
      ));
      setSelectedDentista(undefined);
      alert('Dentista actualizado exitosamente');
    } catch (error: any) {
      alert('Error al actualizar dentista: ' + error.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro de eliminar este dentista?')) return;
    try {
      await axios.delete(`${API_URL}/dentistas/${id}`);
      setDentistas(dentistas.filter(d => d.id !== id));
      alert('Dentista eliminado exitosamente');
    } catch (error: any) {
      alert('Error al eliminar dentista: ' + error.message);
    }
  };

  return (
    <div className="App">
      <h1>Gestión de Dentistas</h1>
      <DentistaForm
        onSubmit={selectedDentista ? handleUpdate : handleCreate}
        initialData={selectedDentista}
        onCancel={() => setSelectedDentista(undefined)}
      />
      <DentistaTable
        dentistas={dentistas}
        onEdit={setSelectedDentista}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
