import { useState } from "react";
import axios from "axios";

const UserInfo = () => {
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMoney = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/send-money",
        { recipientMobile: mobile, amount, pin },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || "Transaction failed");
    }
  };


  return (
    <div className="max-w-md mx-auto border-2 border-indigo-600 mt-10 p-8">
      <h2 className="text-2xl font-bold mb-6">Send Money Please </h2>
      <form onSubmit={handleSendMoney}>
        <div className="form-control">
          <label className="label"><span className="label-text text-base font-semibold">Recipient Mobile Number</span></label>
          <input
            type="text"
            name="mobile"
            placeholder="Recipient Mobile Number"
            className="input input-bordered"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text text-base font-semibold">Amount</span></label>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            className="input input-bordered"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text text-base font-semibold">PIN</span></label>
          <input
            type="password"
            name="pin"
            placeholder="PIN"
            className="input input-bordered"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">Send Money</button>
        </div>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default UserInfo;
