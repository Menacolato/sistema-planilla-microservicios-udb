import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/login', { 
        usuario: username, 
        contrasena: password 
      });
      
      // Mapeamos el token tal como lo devuelve tu clase JwtResponse del backend
      const token = response.data.token || response.data.jwt || response.data.accessToken; 
      
      if (token) {
        localStorage.setItem('token', token);
        navigate('/dashboard');
      } else {
        setError('El servidor no devolvió un token válido.');
      }
    } catch (err) {
      // Si el backend responde, mostramos el mensaje exacto del error
      const msgError = err.response?.data?.message || 'Credenciales incorrectas o problema de comunicación con el servidor.';
      setError(msgError);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '150px auto', padding: '30px', border: '1px solid #cbd5e1', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', backgroundColor: '#ffffff', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#0f172a', marginBottom: '20px' }}>Sistema de Planillas</h2>
      {error && <p style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '10px', borderRadius: '4px', textAlign: 'center', fontSize: '0.9rem' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#334155' }}>Usuario:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '94%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1' }} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#334155' }}>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '94%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1' }} required />
        </div>
        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          Ingresar al Sistema
        </button>
      </form>
    </div>
  );
};

export default Login;