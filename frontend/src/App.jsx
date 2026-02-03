import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import Lorries from './pages/lorries/Lorries';

import Drivers from './pages/drivers/Drivers';

import Trips from './pages/trips/Trips';

import Reports from './pages/reports/Reports';
import Maintenance from './pages/maintenance/Maintenance';
import AuditLogs from './pages/AuditLogs';

import { AuthProvider } from './context/AuthContext';

// Placeholder pages
// const Lorries = () => <div className="p-4 text-2xl font-bold text-slate-800">Lorries Management</div>;
// const Drivers = () => <div className="p-4 text-2xl font-bold text-slate-800">Drivers Management</div>;
// const Trips = () => <div className="p-4 text-2xl font-bold text-slate-800">Trip Management</div>;
// const Reports = () => <div className="p-4 text-2xl font-bold text-slate-800">Reports Module</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="lorries" element={<Lorries />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="trips" element={<Trips />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="reports" element={<Reports />} />
            <Route path="audit-logs" element={<AuditLogs />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
