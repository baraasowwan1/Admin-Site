// This is the App.tsx file for your separate admin deployment
// Use this when creating the admin project

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ClientManagement from './pages/ClientManagement';
import SubscriptionManagement from './pages/SubscriptionManagement';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Admin routes without /admin prefix */}
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/clients" element={<ClientManagement />} />
        <Route path="/subscriptions" element={<SubscriptionManagement />} />
      </Routes>
    </Router>
  );
}
