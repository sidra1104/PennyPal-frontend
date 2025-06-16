import React, { useState } from 'react';
import { addTransaction } from '../services/api';
import { format } from 'date-fns';

function TransactionForm({ onTransactionAdded }) {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [type, setType] = useState('expense');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await addTransaction({
        amount: parseFloat(amount),
        currency,
        description,
        date,
        type,
      });
      
      setAmount('');
      setDescription('');
      setDate(format(new Date(), 'yyyy-MM-dd'));
      onTransactionAdded();
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <h2>Add New Transaction</h2>
      
      <div className="form-group">
        <label>Type:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="expense"
              checked={type === 'expense'}
              onChange={() => setType('expense')}
            />
            Expense
          </label>
          <label>
            <input
              type="radio"
              value="income"
              checked={type === 'income'}
              onChange={() => setType('income')}
            />
            Income
          </label>
        </div>
      </div>
      
      <div className="form-group">
        <label>Amount:</label>
        <div className="amount-input">
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="QAR">QAR</option>
            <option value="INR">INR</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Transaction'}
      </button>
    </form>
  );
}

export default TransactionForm;