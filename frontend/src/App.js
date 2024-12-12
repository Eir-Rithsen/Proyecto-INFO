import React, { useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function App() {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [numeroLegajo, setNumeroLegajo] = useState('');
  const [data, setData] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { nombreCompleto, numeroLegajo });
      alert(response.data);
      // Aqui podrias hacer una solicitud adicional para obtener los datos de las graficas
    } catch (error) {
      alert('Autenticaci贸n fallida');
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data);
    } catch (error) {
      alert('Error al subir el archivo');
    }
  };

  const fetchData = async () => {
    // Aqui ira ila logica para obtener los datos de las graficas desde el backend
    setData({
      labels: ['Aprobados', 'Desaprobados'],
      datasets: [
        {
          label: 'Porcentaje de Aprobacion',
          data: [65, 35],
          backgroundColor: ['#36A2EB', '#FF6384']
        }
      ]
    });
  };

  return (
    <div>
      <h1>Login de Alumnos</h1>
      <input type="text" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} placeholder="Nombre Completo" />
      <input type="text" value={numeroLegajo} onChange={(e) => setNumeroLegajo(e.target.value)} placeholder="Numero de Legajo" />
      <button onClick={handleLogin}>Login</button>

      <h1>Subir Archivos</h1>
      <input type="file" onChange={handleFileUpload} />

      <h1>Estadisticas</h1>
      <button onClick={fetchData}>Cargar Datos</button>
      {data && (
        <>
          <Pie data={data} />
          <Bar data={data} />
        </>
      )}
    </div>
  );
}

export default App;