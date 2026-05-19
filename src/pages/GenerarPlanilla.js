import React, { useState } from 'react';
import api from '../api/axiosConfig';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const GenerarPlanilla = () => {
  const [idEmpleado, setIdEmpleado] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [resultado, setResultado] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const handleProcesar = async (e) => {
    e.preventDefault(); setMensaje(''); setResultado(null);
    try {
      const response = await api.post('/planillas/procesar', { idEmpleado: parseInt(idEmpleado), periodo: periodo });
      setResultado(response.data);
      setMensaje('¡Planilla procesada con éxito!');
      handleBuscarHistorial();
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al procesar el periodo.';
      setMensaje(errorMsg);
    }
  };

  const handleBuscarHistorial = async () => {
    if (!idEmpleado) return;
    try {
      const response = await api.get(`/planillas/empleado/${idEmpleado}`);
      setHistorial(response.data);
    } catch (err) {
      alert('Error al mapear el historial del empleado.');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#334155' }}>
      <Navbar />
      <Sidebar />
      <main style={{ marginLeft: '260px', marginTop: '80px', padding: '20px' }}>
        <h2>💵 Procesamiento de Planillas de Ley</h2>
        <div style={{ border: '1px solid #e2e8f0', padding: '20px', marginBottom: '30px', borderRadius: '8px', backgroundColor: '#ffffff', maxWidth: '600px' }}>
          <form onSubmit={handleProcesar}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Código ID Empleado:</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="number" value={idEmpleado} onChange={(e) => setIdEmpleado(e.target.value)} style={{ padding: '8px' }} required />
                <button type="button" onClick={handleBuscarHistorial} style={{ backgroundColor: '#0f172a', color: 'white', padding: '8px' }}>🔎 Ver Historial</button>
              </div>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Período (Mes-Año):</label>
              <input type="text" placeholder="Ej: MAYO-2026" value={periodo} onChange={(e) => setPeriodo(e.target.value)} style={{ width: '95%', padding: '8px' }} required />
            </div>
            <button type="submit" style={{ backgroundColor: '#16a34a', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>⚙️ Calcular Planilla</button>
          </form>
        </div>

        {mensaje && <p style={{ fontWeight: 'bold', padding: '10px', borderRadius: '4px', color: mensaje.includes('Error') ? '#dc2626' : '#16a34a', backgroundColor: mensaje.includes('Error') ? '#fef2f2' : '#f0fdf4' }}>{mensaje}</p>}

        {resultado && (
          <div style={{ border: '1px solid #bbf7d0', borderRadius: '8px', padding: '20px', marginBottom: '30px', backgroundColor: '#f0fdf4' }}>
            <h3>📄 Boleta Generada: {resultado.nombreEmpleado}</h3>
            <p><strong>Salario Bruto:</strong> ${resultado.salarioBruto.toFixed(2)}</p>
            <p><strong>Descuentos:</strong> <span style={{ color: '#b91c1c' }}>{resultado.detallesDescuentos}</span></p>
            <h4>Salario Neto: ${resultado.salarioNeto.toFixed(2)}</h4>
          </div>
        )}

        <h3>Historial de Planillas</h3>
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff' }}>
          <thead><tr style={{ backgroundColor: '#f8fafc' }}><th>ID Planilla</th><th>Período</th><th>Fecha Emisión</th><th>Salario Bruto</th><th>Descuentos</th><th>Salario Neto</th></tr></thead>
          <tbody>
            {historial.map((p) => (
              <tr key={p.id_planilla}>
                <td>{p.id_planilla}</td><td>{p.periodo}</td><td>{p.fechaGeneracion}</td><td>${p.salarioBruto.toFixed(2)}</td><td>{p.detallesDescuentos}</td><td style={{ fontWeight: 'bold', color: '#1e3a8a' }}>${p.salarioNeto.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default GenerarPlanilla;