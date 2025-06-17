import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
};

type FinanceContextProps = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  clearTransactions: () => void;
};

const FinanceContext = createContext<FinanceContextProps>({} as FinanceContextProps);

export const FinanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const STORAGE_KEY = '@transactions';

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    saveTransactions();
  }, [transactions]);

  const loadTransactions = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setTransactions(JSON.parse(data));
      }
    } catch (error) {
      console.log('Erro ao carregar transações:', error);
    }
  };

  const saveTransactions = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.log('Erro ao salvar transações:', error);
    }
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const clearTransactions = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setTransactions([]);
    } catch (error) {
      console.log('Erro ao limpar transações:', error);
    }
  };

  return (
    <FinanceContext.Provider value={{ transactions, addTransaction, clearTransactions }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
