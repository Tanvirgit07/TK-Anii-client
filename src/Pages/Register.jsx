import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // useNavigate hook

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const mobile = form.mobile.value;
    const email = form.email.value;
    const pin = form.pin.value;
    const role = value;

    // Validate 5-digit numeric PIN
    const pinRegex = /^\d{5}$/;
    if (!pinRegex.test(pin)) {
      setError("PIN must be a 5-digit number");
      return;
    }

    const register = {
      name,
      mobile,
      email,
      pin,
      role,
      status: "pending", // Set initial status to pending
    };

    try {
      const response = await axios.post("http://localhost:5000/register", register);
      localStorage.setItem('user', JSON.stringify(register)); // Save user data to local storage
      localStorage.setItem('token', response.data.token); // Save token to local storage
      console.log(response.data);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      console.error(error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="hero min-h-[100vh] mx-auto"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/premium-vector/network-connection-background-abstract-style_23-2148875738.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="card shrink-0 w-full max-w-2xl shadow-2xl bg-base-100">
        <div>
          <h1 className="text-center text-2xl mt-6">Register Now !</h1>
        </div>
        <form onSubmit={handleRegister} className="card-body">
          <div className="">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="User Name"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Mobile Number</span>
                </label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">PIN Code</span>
                </label>
                <input
                  type="password"
                  name="pin"
                  placeholder="5-digit PIN"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            <div className="">
              <select
                onChange={(event) => setValue(event.target.value)}
                className="select select-bordered w-full mt-5"
                required
              >
                <option value="" disabled selected>
                  Select Role
                </option>
                <option value="User">User</option>
                <option value="Agent">Agent</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
          <div>
            <p>
              You have an account?
              <Link to="/login" className="link link-primary">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
