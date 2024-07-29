import { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming JWT token is stored in local storage
        const response = await axios.get('http://localhost:5000/transactions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Log the response data for debugging
        console.log('Response data:', response.data);

        // Ensure the response data is an array
        if (Array.isArray(response.data)) {
          setTransactions(response.data);
        } else {
          console.error('Invalid response format:', response.data);
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError(error.response?.data?.message || 'Failed to fetch transactions');
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className='overflow-x-auto max-w-4xl mx-auto'>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table className='table table-xs'>
        <thead>
          <tr>
            <th>No</th>
            <th>Agent Mobile</th>
            <th>User Mobile</th>
            <th>Total Amount</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction,index) => (
              <tr key={transaction._id}>
                <td>{index + 1}</td>
                <td>{transaction.agentMobile || transaction.userId}</td>
                <td>{transaction.userMobile || transaction.agentId}</td>
                <td>{transaction.amount || transaction.totalDeduction}</td>
                <td>{new Date(transaction.date).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
