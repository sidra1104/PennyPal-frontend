import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + '/api'
});

export const getTransactions = () => api.get('/transactions');
export const addTransaction = (transaction) => api.post('/transactions', transaction);
export const getTransactionSummary = () => api.get('/transactions/summary');

export const convertCurrency = (from, to, amount) => 
  api.get('/currency/convert', { params: { from, to, amount } });

export const getExchangeRates = (base) => 
  api.get('/currency/rates', { params: { base } });