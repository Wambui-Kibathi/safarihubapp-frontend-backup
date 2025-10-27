import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { PaymentProvider } from '@/context/PaymentContext';
import AppRouter from './routes/AppRouter';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PaymentProvider>
          <AppRouter />
        </PaymentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;