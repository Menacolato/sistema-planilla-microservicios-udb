import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importación de Páginas
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmpleadosList from './pages/EmpleadosList';
import GenerarPlanilla from './pages/GenerarPlanilla';

// Importación del Guardián de Rutas
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta Pública: Pantalla de Acceso */}
        <Route path="/login" element={<Login />} />

        {/* Rutas Privadas: Protegidas con el Guardián JWT */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/empleados" 
          element={
            <ProtectedRoute>
              <EmpleadosList />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/planillas" 
          element={
            <ProtectedRoute>
              <GenerarPlanilla />
            </ProtectedRoute>
          } 
        />

        {/* Redirección por defecto: Cualquier ruta desconocida manda al Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;