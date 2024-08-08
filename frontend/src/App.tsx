import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';

import './App.css';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import { ShipmentsPage } from './pages/ShipmentsPage';


const theme = createTheme({
    palette: {
        primary: {
            main: '#2AC3AD'
        }
    }
})

export const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Navbar />
                <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/shipments" element={<ShipmentsPage />} />
                </Routes>
                </Suspense>
            </Router>
        </ThemeProvider>
    );
}
