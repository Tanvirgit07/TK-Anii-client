import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pin = form.pin.value;

    const login = {
      email,
      pin,
    };

    try {
      const response = await axios.post("http://localhost:5000/login", login);
      console.log(response);
      const token = response.data.token;
      localStorage.setItem("token", token); // Store JWT token

      // Fetch user data using the token
      const userResponse = await axios.get(`http://localhost:5000/user/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = userResponse.data;
      console.log(user);

      form.reset(); 

      if (user.status === "accepted") {
        navigate("/dashboard");
      } else {
        Swal.fire({
          title: "Login Successfully! Please Wait For Admin Approval",
          text: "Please wait !",
          icon: "success",
        });
      }
    } catch (error) {
      console.error(error);
      setError("Login failed. Please try again.");
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
      <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
        <div>
          <h1 className="text-center text-2xl mt-6">Login Now!</h1>
        </div>
        <form onSubmit={handleLogin} className="card-body">
          <div className="">
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

            <div className="form-control mt-4 relative">
              <p className="ml-1 mb-1">Pin Code</p>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  name="pin"
                  className="grow"
                  placeholder="*******"
                  required
                />
              </label>
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
          <div>
            <p>
              Dont have an account?
              <Link to="/" className="link link-primary">
                {" "}
                Register{" "}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

