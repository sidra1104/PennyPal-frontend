import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { format } from 'date-fns';

// Register all Chart.js components
Chart.register(...registerables);

function ExpenseChart({ summary }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!summary || summary.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = summary.map(item => format(new Date(item.transactionDate), 'MMM dd'));
    const expenseData = summary.map(item => item.totalExpenses || 0);
    const incomeData = summary.map(item => item.totalIncome || 0);

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Expenses',
            data: expenseData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.1,
          },
          {
            label: 'Income',
            data: incomeData,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Expenses and Income Over Time',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [summary]);

  if (!summary || summary.length === 0) {
    return <p>No data available for the chart.</p>;
  }

  return (
    <div className="chart-container">
      <canvas ref={chartRef} />
    </div>
  );
}

export default ExpenseChart;