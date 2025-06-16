import React, { useState, useEffect } from 'react';
import { getTransactions, getTransactionSummary } from './services/api';
import './App.css';
import TransactionForm from './components/TransactionForm.js';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';
import CurrencyConverter from './components/CurrencyConverter';
import SummaryCard from './components/SummaryCard';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState([]);
  const [activeTab, setActiveTab] = useState('transactions');

  useEffect(() => {
    fetchTransactions();
    fetchSummary();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await getTransactionSummary();
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  const handleTransactionAdded = () => {
    fetchTransactions();
    fetchSummary();
  };

  return (
    <div className="app-container">
      <h1>PennyPal</h1>
      
      <div className="tabs">
        <button 
          className={activeTab === 'transactions' ? 'active' : ''}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
        <button 
          className={activeTab === 'charts' ? 'active' : ''}
          onClick={() => setActiveTab('charts')}
        >
          Charts
        </button>
        <button 
          className={activeTab === 'converter' ? 'active' : ''}
          onClick={() => setActiveTab('converter')}
        >
          Currency Converter
        </button>
      </div>
      
      <div className="content">
        {activeTab === 'transactions' && (
          <>
            <TransactionForm onTransactionAdded={handleTransactionAdded} />
            <TransactionList transactions={transactions} />
          </>
        )}
        
        {activeTab === 'charts' && (
          <>
            <SummaryCard summary={summary} />
            <ExpenseChart summary={summary} />
          </>
        )}
        
        {activeTab === 'converter' && (
          <CurrencyConverter />
        )}
      </div>
    </div>
  );
}

export default App;