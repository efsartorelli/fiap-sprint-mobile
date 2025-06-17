import React from 'react';
import Routes from './src/navigation';
import { FinanceProvider } from './src/contexts/FinanceContext';

export default function App() {
  return (
    <FinanceProvider>
      <Routes />
    </FinanceProvider>
  );
}
