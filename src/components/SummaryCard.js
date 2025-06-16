import React from 'react';

function SummaryCard({ summary }) {
  if (!summary || summary.length === 0) {
    return <p>No summary data available.</p>;
  }

  const totalExpenses = summary.reduce((sum, item) => sum + parseFloat(item.totalExpenses || 0), 0);
  const totalIncome = summary.reduce((sum, item) => sum + parseFloat(item.totalIncome || 0), 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary-cards">
      <div className="summary-card income">
        <h3>Total Income</h3>
        <p>${totalIncome.toFixed(2)}</p>
      </div>
      <div className="summary-card expense">
        <h3>Total Expenses</h3>
        <p>${totalExpenses.toFixed(2)}</p>
      </div>
      <div className={`summary-card ${balance >= 0 ? 'positive' : 'negative'}`}>
        <h3>Balance</h3>
        <p>${balance.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default SummaryCard;