import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';


interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionsContexData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  removeTransaction: (transactionId: number) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContexData>(
  {} as TransactionsContexData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const returnURL =  localStorage.getItem('transactions');
    if (returnURL) {
      const data = JSON.parse(returnURL)
      setTransactions(data)
    }
  }, [])
   
  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    })

    const { transaction } = response.data;

    setTransactions([
      ...transactions,
      transaction,
    ]);

    localStorage.setItem('transactions', JSON.stringify(
      [
        ...transactions,
        transaction,
      ]
    ));

  }
  
  async function removeTransaction(transactionId: number) {
    const { data } = await api.delete(`/transactions/${transactionId}`);
    setTransactions(data.transactions);

    const { transaction } = data;

    console.log(transaction)

    localStorage.removeItem('transaction.id');
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction, removeTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context;
}