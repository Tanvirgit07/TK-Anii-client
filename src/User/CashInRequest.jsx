// import { useState } from 'react';
// import axios from 'axios';
// // import jwt_decode from 'jwt-decode';
// // import { jwtDecode } from "jwt-decode";

// const CashInRequest = () => {
//   const [agentMobile, setAgentMobile] = useState('');
//   const [amount, setAmount] = useState('');
//   const [pin, setPin] = useState('');
//   const [message, setMessage] = useState('');

//   const handleRequest = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post('http://localhost:5000/cash-in-request', {
//         agentMobile,
//         amount,
//         pin
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'Request failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Cash-In Request</h2>
//       <input type="text" placeholder="Agent Mobile" value={agentMobile} onChange={(e) => setAgentMobile(e.target.value)} />
//       <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
//       <input type="password" placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} />
//       <button onClick={handleRequest}>Send Request</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default CashInRequest;

import { useState } from "react";
import axios from "axios";

const CashInRequest = () => {
  const [agentMobile, setAgentMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");

  const handleRequest = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/cash-in-request",
        {
          agentMobile,
          amount,
          pin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Request failed");
    }
  };

  return (
    <div className="max-w-md mx-auto border-2 border-secondary mt-10 p-8">
      <h2 className="text-2xl font-bold mb-6">Cash-In Request</h2>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-base font-semibold">
            Agent Mobile
          </span>
        </label>
        <input
          type="text"
          name="agentMobile"
          className="input input-bordered"
          value={agentMobile}
          onChange={(e) => setAgentMobile(e.target.value)}
          required
          placeholder="Agent Mobile"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-base font-semibold">Amount</span>
        </label>
        <input
          name="agentMobile"
          className="input input-bordered"
          required
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-base font-semibold">Amount</span>
        </label>
        <input
          name="agentMobile"
          className="input input-bordered"
          required
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
      </div>

      {/* <input
        type="text"
        placeholder="Agent Mobile"
        value={agentMobile}
        onChange={(e) => setAgentMobile(e.target.value)}
      /> */}
      {/* <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      /> */}
      {/* <input
        type="password"
        placeholder="PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      /> */}
      {/* <button onClick={handleRequest}>Send Request</button> */}
      <div className="form-control mt-6">
          <button onClick={handleRequest} className="btn btn-secondary">Send Request</button>
        </div>
      {message && <p className="text-center mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default CashInRequest;
