// import { useEffect, useState } from 'react';

// // Utility function to decode JWT token
// const decodeToken = (token) => {
//   if (token) {
//     try {
//       const decoded = JSON.parse(atob(token.split('.')[1]));
//       return decoded;
//     } catch (error) {
//       console.error('Error decoding token:', error);
//     }
//   }
//   return null;
// };

// const Dashboard = async () => {
//   const [user, setUser] = useState(null);
//   console.log(user)

//   const dashboardUser = await axios.get(`http://localhost:5000/user/${user.email}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const person = dashboardUser.data;
//   console.log(person);


//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedUser = decodeToken(token);
//       setUser(decodedUser);
//     }
//   }, []);

//   return (
//     <div>
//       {user ? (
//         <div>
//           <h2>Welcome, {user.email}</h2>
//         </div>
//       ) : (
//         <p>Loading user data...</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import { useEffect, useState } from 'react';
import axios from 'axios';
import User from '../User/User';

// Utility function to decode JWT token
const decodeToken = (token) => {
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  return null;
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = decodeToken(token);
      setUser(decodedUser);

      // Fetch user data using the token
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/person/${decodedUser.email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPerson(response.data);
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, []);

  if (!user || !person) {
    return <p>Loading user data...</p>;
  }

  return (
    <div>
      <div>
        <User person={person}></User>
      </div>
    </div>
  );
};

export default Dashboard;



