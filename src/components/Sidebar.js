import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  // Función para darle un estilo visual al botón de la pantalla donde estamos parados
  const linkStyle = (path) => ({
    display: 'block',
    color: 'white',
    textDecoration: 'none',
    padding: '12px 20px',
    marginBottom: '5px',
    borderRadius: '4px',
    backgroundColor: location.pathname === path ? '#334155' : 'transparent',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    transition: 'background 0.2s'
  });

  return (
    <aside style={{
      width: '240px',
      backgroundColor: '#0f172a',
      position: 'fixed',
      top: '60px', // Comienza justo abajo de la Navbar
      bottom: 0,
      left: 0,
      padding: '20px 10px',
      boxShadow: '2px 0 5px rgba(0,0,0,0.05)'
    }}>
      <div style={{ marginBottom: '20px', padding: '0 10px' }}>
        <small style={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Navegación</small>
      </div>
      
      <Link to="/dashboard" style={linkStyle('/dashboard')}>
        📊 Panel Principal
      </Link>
      
      <Link to="/empleados" style={linkStyle('/empleados')}>
        👥 Control de Empleados
      </Link>
      
      <Link to="/planillas" style={linkStyle('/planillas')}>
        💵 Procesar Planilla
      </Link>
    </aside>
  );
};

export default Sidebar;