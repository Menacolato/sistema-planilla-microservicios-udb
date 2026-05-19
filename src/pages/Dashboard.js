import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#334155' }}>
      <Navbar />
      <Sidebar />
      <main style={{ marginLeft: '260px', marginTop: '80px', padding: '20px' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h1 style={{ color: '#0f172a', marginTop: 0 }}>📊 Panel de Control Principal</h1>
          <p style={{ fontSize: '1.1rem', color: '#64748b' }}>Bienvenido al Sistema de Gestión de Planillas de Cátedra.</p>
          <hr style={{ border: '0', height: '1px', backgroundColor: '#e2e8f0', margin: '20px 0' }} />
          <h3>Resumen Técnico del Proyecto:</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li><strong>Backend:</strong> Spring Boot + Spring Security + JWT + MySQL.</li>
            <li><strong>Lógica Contable:</strong> Descuentos de ley automatizados (AFP 7.25% e ISSS 3%).</li>
            <li><strong>Validación:</strong> Escudo anti-duplicación nativo por identificación de empleado.</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;