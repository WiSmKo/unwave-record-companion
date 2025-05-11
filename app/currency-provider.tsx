'use client'

import { CurrencyRates } from '@/types/currency';
import React, { createContext, useEffect, useState } from 'react';


interface CurrencyContextType {
    rates: CurrencyRates | null;
    loading: boolean;
  }
  
export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   
    const [rates, setRates] = useState<CurrencyRates | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRates = async () => {
          try {
            const response = await fetch('/api/currency');
            const data = await response.json();
            setRates(data);
          } catch (error) {
            console.error('Failed to load exchange rates:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchRates();
      }, []);
      
    return(
        <CurrencyContext.Provider value={{rates, loading}}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = React.useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}