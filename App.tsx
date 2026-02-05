
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TabProvider } from './context/TabContext';
import { ToastProvider } from './context/ToastContext';
import { AuthLayout } from './layouts/AuthLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { LoginPage } from './pages/Auth/Login';
import { RegisterPage } from './pages/Auth/Register';
import { RecoverPage } from './pages/Auth/Recover';
import { LockScreenPage } from './pages/Auth/LockScreen';
import { DashboardPage } from './pages/Dashboard';
import { UserManagementPage } from './pages/CRUD/UserManagement';
import { SettingsPage } from './pages/Profile/Settings';
import { DesignSystemPage } from './pages/DesignSystem';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <TabProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/recover" element={<RecoverPage />} />
              </Route>
              <Route path="/lock" element={<LockScreenPage />} />
              <Route element={<AdminLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/users" element={<UserManagementPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/design-system" element={<DesignSystemPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </TabProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
