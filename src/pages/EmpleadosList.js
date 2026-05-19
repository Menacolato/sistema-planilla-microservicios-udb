import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const EmpleadosList = () => {
  const [empleados, setEmpleados] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({ nombre: '', apellido: '', identificacion: '', tipo: 'PLAZA_FIJA', direccion: '', salarioBaseVigente: '' });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => { cargarEmpleados(); }, []);

  const cargarEmpleados = async () => {
    try {
      const response = await api.get('/empleados');
      setEmpleados(response.data);
    } catch (err) {
      setErrorMsg('No se pudieron recuperar los empleados de la base de datos.');
    }
  };

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setErrorMsg('');
    const datosEnviar = { ...formData, salarioBaseVigente: parseFloat(formData.salarioBaseVigente) };
    try {
      if (editandoId) {
        await api.put(`/empleados/${editandoId}`, datosEnviar);
        setMensaje('¡Empleado actualizado con éxito!');
      } else {
        await api.post('/empleados', datosEnviar);
        setMensaje('¡Empleado registrado con éxito!');
      }
      limpiarFormulario();
      cargarEmpleados();
    } catch (err) {
      const backendError = err.response?.data?.message || 'Error en la transacción.';
      setErrorMsg(backendError);
    }
  };

  const handleIniciarEdicion = (emp) => {
    setEditandoId(emp.id_empleado);
    setFormData({ nombre: emp.nombre, apellido: emp.apellido, identificacion: emp.identificacion, tipo: emp.tipo || 'PLAZA_FIJA', direccion: emp.direccion || '', salarioBaseVigente: emp.salarioBaseVigente });
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Confirmas la eliminación de este empleado?')) {
      setMensaje(''); setErrorMsg('');
      try {
        await api.delete(`/empleados/${id}`);
        setMensaje('Empleado removido del sistema de forma correcta.');
        cargarEmpleados();
      } catch (err) {
        setErrorMsg('Integridad: El empleado posee planillas vinculadas en el historial y no puede ser borrado.');
      }
    }
  };

  const limpiarFormulario = () => {
    setEditandoId(null);
    setFormData({ nombre: '', apellido: '', identificacion: '', tipo: 'PLAZA_FIJA', direccion: '', salarioBaseVigente: '' });
  };

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#334155' }}>
      <Navbar />
      <Sidebar />
      <main style={{ marginLeft: '260px', marginTop: '80px', padding: '20px' }}>
        <h2>👥 Control de Personal</h2>
        {mensaje && <p style={{ color: '#16a34a', backgroundColor: '#f0fdf4', padding: '10px', borderRadius: '4px' }}>{mensaje}</p>}
        {errorMsg && <p style={{ color: '#dc2626', backgroundColor: '#fef2f2', padding: '10px', borderRadius: '4px' }}>{errorMsg}</p>}
        <div style={{ border: '1px solid #e2e8f0', padding: '20px', marginBottom: '30px', borderRadius: '8px', backgroundColor: '#ffffff' }}>
          <h3>{editandoId ? '📝 Modificar Empleado' : '➕ Dar de Alta Empleado'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div><label>Nombres:</label><input type="text" name="nombre" value={formData.nombre} onChange={handleChange} style={{ width: '94%', padding: '8px' }} required /></div>
              <div><label>Apellidos:</label><input type="text" name="apellido" value={formData.apellido} onChange={handleChange} style={{ width: '94%', padding: '8px' }} required /></div>
              <div><label>Identificación (DUI):</label><input type="text" name="identificacion" value={formData.identificacion} onChange={handleChange} style={{ width: '94%', padding: '8px' }} required /></div>
              <div><label>Régimen:</label>
                <select name="tipo" value={formData.tipo} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
                  <option value="PLAZA_FIJA">Plaza Fija</option>
                  <option value="SERVICIOS_PROFESIONALES">Servicios Profesionales</option>
                </select>
              </div>
              <div><label>Salario Base ($):</label><input type="number" step="0.01" name="salarioBaseVigente" value={formData.salarioBaseVigente} onChange={handleChange} style={{ width: '94%', padding: '8px' }} required /></div>
              <div><label>Dirección:</label><input type="text" name="direccion" value={formData.direccion} onChange={handleChange} style={{ width: '94%', padding: '8px' }} /></div>
            </div>
            <button type="submit" style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{editandoId ? 'Guardar Cambios' : 'Registrar'}</button>
            {editandoId && <button type="button" onClick={limpiarFormulario} style={{ marginLeft: '10px', padding: '10px 20px' }}>Cancelar</button>}
          </form>
        </div>
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff' }}>
          <thead><tr style={{ backgroundColor: '#f8fafc' }}><th>ID</th><th>Empleado</th><th>DUI</th><th>Régimen</th><th>Salario Base</th><th>Acciones</th></tr></thead>
          <tbody>
            {empleados.map((emp) => (
              <tr key={emp.id_empleado}>
                <td>{emp.id_empleado}</td><td>{emp.nombre} {emp.apellido}</td><td>{emp.identificacion}</td><td>{emp.tipo}</td><td>${emp.salarioBaseVigente.toFixed(2)}</td>
                <td>
                  <button onClick={() => handleIniciarEdicion(emp)} style={{ marginRight: '8px' }}>✏️ Editar</button>
                  <button onClick={() => handleEliminar(emp.id_empleado)} style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}>🗑️ Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default EmpleadosList;