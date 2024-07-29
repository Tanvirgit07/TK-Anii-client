// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, Toaster } from "sonner";

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/users", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you are storing the JWT token in local storage
//           },
//         });
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleStatusChange = async (userId, status) => {
//     try {
//       await axios.put(`http://localhost:5000/users/${userId}`, { status }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you are storing the JWT token in local storage
//         },
//       });
//       setUsers(users.map(user =>
//         user._id === userId ? { ...user, status } : user
//       ));
//       if (status === "accepted") {
//         toast.success('User status changed to Accepted !');
//       } else if (status === "pending") {
//         toast.error('User status changed to Pending !');
//       }
//     } catch (error) {
//       console.error(`Error updating user status:`, error);
//       toast.error('Failed to update user status.');
//     }
//   };

//   // Filter users based on the search term
//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="overflow-x-auto">
//       <div className="mb-10 max-w-xs mx-auto">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           className="input input-bordered w-full"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <table className="table table-xs">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Mobile</th>
//             <th>Role</th>
//             <th>Status</th>
//             <th>Balance</th>
//             <th>Approve</th>
//             <th>Reject</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.map((user) => (
//             <tr key={user._id}>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.mobile}</td>
//               <td>{user.role}</td>
//               <td>{user.status}</td>
//               <td>{user.balance}</td>
//               <td>
//                 <button
//                   className="btn btn-xs bg-green-500"
//                   onClick={() => handleStatusChange(user._id, "accepted")}
//                 >
//                   Accepted
//                 </button>
//               </td>
//               <td>
//                 <button
//                   className="btn btn-xs bg-red-500"
//                   onClick={() => handleStatusChange(user._id, "pending")}
//                 >
//                   Rejected
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Toaster position="top-right" richColors  />
//     </div>
//   );
// };

// export default UserList;


import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you are storing the JWT token in local storage
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleStatusChange = async (userId, status) => {
    try {
      await axios.put(`http://localhost:5000/users/${userId}`, { status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you are storing the JWT token in local storage
        },
      });
      setUsers(users.map(user =>
        user._id === userId ? { ...user, status } : user
      ));
      if (status === "accepted") {
        toast.success('User status changed to Accepted !');
      } else if (status === "pending") {
        toast.error('User status changed to Pending !');
      }
    } catch (error) {
      console.error(`Error updating user status:`, error);
      toast.error('Failed to update user status.');
    }
  };

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <div className="mb-10 max-w-xs mx-auto">
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
            <th>Status</th>
            <th>Balance</th>
            <th>Approve</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>{user.balance}</td>
              <td>
                <button
                  className="btn btn-xs bg-green-500"
                  onClick={() => handleStatusChange(user._id, "accepted")}
                  disabled={user.status === "accepted"}
                >
                  Accepted
                </button>
              </td>
              <td>
                <button
                  className="btn btn-xs bg-red-500"
                  onClick={() => handleStatusChange(user._id, "pending")}
                  disabled={user.status === "pending"}
                >
                  Rejected
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default UserList;
