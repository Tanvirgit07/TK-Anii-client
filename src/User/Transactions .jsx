// import { useState, useEffect } from 'react';

// const Transactions = () => {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/transactions', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`, // Replace with actual token retrieval method
//           },
//         });
//         const data = await response.json();
//         setTransactions(data);
//       } catch (error) {
//         console.error('Error fetching transactions:', error);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   return (
//     <div className='overflow-x-auto'>
//       <table className='table table-xs'>
//         <thead>
//           <tr>
//             <th>No</th>
//             <th>Sender ID</th>
//             <th>Sender Name</th>
//             <th>Recipient ID</th>
//             <th>Amount</th>
//             <th>Fee</th>
//             <th>Total Amount</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((transaction,index) => (
//             <tr key={transaction._id}>
//                 <td>{index + 1}</td>
//               <td>{(transaction.senderId || transaction.userId || '').slice(0, 10)}</td>
//               <td>{(transaction.senderName || transaction.userMobile || '')}</td>
//               <td>{(transaction.recipientId || transaction.agentId || '').slice(0, 10)}</td>
//               <td>{transaction.amount}</td>
//               <td>{transaction.fee || transaction.totalDeduction - transaction.amount}</td>
//               <td>{transaction.totalAmount || transaction.totalDeduction}</td>
//               <td>{new Date(transaction.date).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Transactions;


// import  { useState, useEffect } from 'react';

// const Transactions = () => {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/transactions', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`, // Replace with actual token retrieval method
//           },
//         });
//         const data = await response.json();
//         setTransactions(data);
//       } catch (error) {
//         console.error('Error fetching transactions:', error);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   const parseNumber = (value) => {
//     const number = parseFloat(value);
//     return isNaN(number) ? 0 : number;
//   };

//   return (
//     <div className='overflow-x-auto'>
//       <table className='table table-xs'>
//         <thead>
//           <tr>
//             <th>No</th>
//             <th>Sender ID</th>
//             <th>Sender Name</th>
//             <th>Recipient ID</th>
//             <th>Amount</th>
//             <th>Fee</th>
//             <th>Total Amount</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((transaction,index) => (
//             <tr key={transaction._id}>
//                 <td>{index + 1}</td>
//               <td>{(transaction.senderId || transaction.userId || '').slice(0, 10)}</td>
//               <td>{transaction.senderName || transaction.userMobile}</td>
//               <td>{(transaction.recipientId || transaction.agentId || '').slice(0, 10)}</td>
//               <td>{parseNumber(transaction.amount)}</td>
//               <td>{parseNumber(transaction.fee) || 0}</td>
//               <td>{parseNumber(transaction.totalAmount) || parseNumber(transaction.totalDeduction)}</td>
//               <td>{new Date(transaction.date).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Transactions;

import { useState, useEffect } from 'react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:5000/all-transactions', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const parseNumber = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? 0 : number;
  };

  return (
    <div className='overflow-x-auto'>
      <table className='table table-xs'>
        <thead>
          <tr>
            <th>No</th>
            <th>Type</th>
            <th>Sender ID</th>
            <th>Sender Name</th>
            <th>Recipient ID</th>
            <th>Amount</th>
            <th>Fee</th>
            <th>Total Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={transaction._id}>
              <td>{index + 1}</td>
              <td>{transaction.type}</td>
              <td>{(transaction.senderId || transaction.userId || '').slice(0, 10)}</td>
              <td>{transaction.senderName || transaction.userMobile}</td>
              <td>{(transaction.recipientId || transaction.agentId || '').slice(0, 10)}</td>
              <td>{parseNumber(transaction.amount)}</td>
              <td>{parseNumber(transaction.fee) || 0}</td>
              <td>{parseNumber(transaction.totalAmount) || parseNumber(transaction.totalDeduction)}</td>
              <td>{new Date(transaction.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;


