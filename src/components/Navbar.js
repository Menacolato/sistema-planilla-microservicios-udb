import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Borramos el token para cerrar la sesión de forma segura
    localStorage.removeItem('token');
    // Redirigimos de inmediato al Login
    navigate('/login');
  };

  return (
    <nav style={{
      height: '60px',
      backgroundColor: '#1e293b',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ margin: 0, fontSize: '1.2rem' }}>⚙️ Sistema de Planillas v1.0</h2>
      <button 
        onClick={handleLogout} 
        style={{
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          padding: '8px 15px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default Navbar;