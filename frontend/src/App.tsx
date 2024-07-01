import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

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

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/shipments" element={<ShipmentsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}


