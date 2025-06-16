import React from 'react';
import { format } from 'date-fns';

function TransactionList({ transactions }) {
  return (
    <div className="transaction-list">
      <h2>Recent Transactions</h2>
      
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className={transaction.type}>
                <td>{format(new Date(transaction.date), 'MMM dd, yyyy')}</td>
                <td>{transaction.description || 'No description'}</td>
                <td>
                  {transaction.amount} {transaction.currency}
                </td>
                <td>
                  <span className={`type-badge ${transaction.type}`}>
                    {transaction.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionList;