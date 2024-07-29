// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const CashInApproval = () => {
//   const [requestId, setRequestId] = useState('');
//   const [agentPin, setAgentPin] = useState('');
//   const [message, setMessage] = useState('');
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:5000/transactions/pending', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setRequests(response.data);
//       } catch (error) {
//         console.error('Failed to fetch requests:', error);
//       }
//     };
//     fetchRequests();
//   }, []);

//   const handleApproval = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post('http://localhost:5000/approve-cash-in', {
//         requestId,
//         agentPin
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setMessage(response.data.message);

//       // Refresh pending requests after approval
//       const fetchRequests = async () => {
//         try {
//           const token = localStorage.getItem('token');
//           const response = await axios.get('http://localhost:5000/transactions/pending', {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           });
//           setRequests(response.data);
//         } catch (error) {
//           console.error('Failed to fetch requests:', error);
//         }
//       };
//       fetchRequests();
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'Approval failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Approve Cash-In Request</h2>
//       <select value={requestId} onChange={(e) => setRequestId(e.target.value)}>
//         <option value="">Select Request</option>
//         {requests.length > 0 ? (
//           requests.map((request) => (
//             <option key={request._id} value={request._id}>
//               {request.amount} Taka from {request.userMobile}
//             </option>
//           ))
//         ) : (
//           <option value="">No pending requests</option>
//         )}
//       </select>
//       <input type="password" placeholder="Agent PIN" value={agentPin} onChange={(e) => setAgentPin(e.target.value)} />
//       <button onClick={handleApproval}>Approve Request</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default CashInApproval;

import { useState, useEffect } from "react";
import axios from "axios";

const CashInApproval = () => {
  const [requestId, setRequestId] = useState("");
  const [agentPin, setAgentPin] = useState("");
  const [message, setMessage] = useState("");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/transactions/pending",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      }
    };
    fetchRequests();
  }, []);

  const handleApproval = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/cash-in-approve",
        {
          requestId,
          pin: agentPin, // Ensure the backend expects 'pin' as the key
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setRequestId(""); // Clear the selected request
      setAgentPin(""); // Clear the pin input

      // Refresh pending requests after approval
      const fetchRequests = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/transactions/pending",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setRequests(response.data);
        } catch (error) {
          console.error("Failed to fetch requests:", error);
        }
      };
      fetchRequests();
    } catch (error) {
      console.error("Approval failed:", error);
      setMessage(error.response?.data?.message || "Approval failed");
    }
  };

  return (
    <div className="max-w-md mx-auto border-2 border-indigo-600 mt-16 p-8">
      <h2 className="text-2xl font-bold mb-6">Approve Cash-In Request</h2>

      {/* <select value={requestId} onChange={(e) => setRequestId(e.target.value)}>
        <option value="">Select Request</option>
        {requests.length > 0 ? (
          requests.map((request) => (
            <option key={request._id} value={request._id}>
              {request.amount} Taka from {request.userMobile}
            </option>
          ))
        ) : (
          <option value="">No pending requests</option>
        )}
      </select> */}

      <select
        value={requestId}
        onChange={(e) => setRequestId(e.target.value)}
        className="select select-bordered w-full"
      >
        <option value="">Select Request</option>
        {requests.length > 0 ? (
          requests.map((request) => (
            <option key={request._id} value={request._id}>
              {request.amount} Taka from {request.userMobile}
            </option>
          ))
        ) : (
          <option value="">No pending requests</option>
        )}
      </select>

      {/* <input
        type="password"
        placeholder="Agent PIN"
        value={agentPin}
        onChange={(e) => setAgentPin(e.target.value)}
      /> */}

      <div className="mt-3 ">
        <p className="mb-2">Agent PIN</p>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            placeholder="Agent PIN"
            value={agentPin}
            onChange={(e) => setAgentPin(e.target.value)}
            className="grow"
          />
        </label>
      </div>

      <div className="form-control mt-6">
        <button onClick={handleApproval} type="submit" className="btn btn-primary">
        Approve Request
        </button>
      </div>

      {/* <button onClick={handleApproval}>Approve Request</button> */}
      {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
    </div>
  );
};

export default CashInApproval;
