import React, { useState, useEffect } from 'react';
import { convertCurrency } from '../services/api';

function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('QAR');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [rate, setRate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currencies = ['USD', 'QAR', 'INR', 'EUR'];

  // Fallback rates if API fails (renamed to not start with "use")
  const getFallbackRate = () => ({
    USD: { QAR: 3.64, INR: 74.57, EUR: 0.85 },
    QAR: { USD: 0.27, INR: 20.48, EUR: 0.23 },
    INR: { USD: 0.013, QAR: 0.049, EUR: 0.011 },
    EUR: { USD: 1.18, QAR: 4.29, INR: 88.72 }
  });

  // Regular function (not a hook)
  const applyFallbackRates = () => {
    const fallbackRates = getFallbackRate();
    if (fallbackRates[fromCurrency]?.[toCurrency]) {
      const fallbackRate = fallbackRates[fromCurrency][toCurrency];
      setConvertedAmount((amount * fallbackRate).toFixed(2));
      setRate(fallbackRate);
    } else {
      setConvertedAmount('');
      setRate(null);
    }
  };

  const convert = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setConvertedAmount('');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await convertCurrency(fromCurrency, toCurrency, amount);
      
      if (response.data) {
        setConvertedAmount(response.data.convertedAmount.toFixed(2));
        setRate(response.data.rate);
      } else {
        // If no data from API, use fallback
        applyFallbackRates();
      }
    } catch (err) {
      // Silently fail and use fallback rates
      applyFallbackRates();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (amount > 0) {
        convert();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [amount, fromCurrency, toCurrency]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value === '' ? '' : parseFloat(value));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      
      <div className="converter-form">
        <div className="input-group">
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Amount"
            disabled={isLoading}
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            disabled={isLoading}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          className="swap-btn" 
          onClick={swapCurrencies} 
          type="button"
          disabled={isLoading}
        >
          ⇄
        </button>
        
        <div className="input-group">
          <input
            type="text"
            value={isLoading ? 'Converting...' : convertedAmount || ''}
            readOnly
            className="result"
            placeholder="Result"
          />
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            disabled={isLoading}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {rate && !isLoading && (
        <div className="rate-info">
          <p>
            1 {fromCurrency} = {rate.toFixed(6)} {toCurrency}
          </p>
          <p>
            1 {toCurrency} = {(1 / rate).toFixed(6)} {fromCurrency}
          </p>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;