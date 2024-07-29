import { useEffect, useState } from 'react';
import axios from 'axios';

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/all-transactions', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust this if you are using a different method to store the token
          }
        });
        setTransactions(response.data);
        console.log(response.data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error fetching transactions: {error}</p>;

  return (
    <div className='overflow-x-auto'>
      <table className='table table-xs'>
        <thead>
          <tr>
            <th>Type</th>
            <th>Sender</th>
            <th>Recipient</th>
            <th>Amount</th>
            <th>Fee</th>
            <th>Total Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.type}</td>
              <td>{transaction.userId || transaction.userMobile || transaction.senderName}</td>
              <td>{transaction.agentId || transaction.agentMobile || transaction.recipientId}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.fee || '-'}</td>
              <td>{transaction.amount || '-'}</td>
              <td>{new Date(transaction.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTransactions;
