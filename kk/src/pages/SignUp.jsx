import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "", // New field for OTP
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Track OTP status

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Send OTP to user's email
  const sendOTP = async () => {
    try {
      const response = await axios.post("http://localhost:5000/send-otp", {
        email: formData.email,
      });

      setMessage(response.data.message);
      setError("");
      setOtpSent(true); // OTP sent successfully
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send OTP");
    }
  };

  // Handle Registration after OTP verification
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        otp: formData.otp, // Send OTP for verification
      });

      setMessage(response.data.message);
      setError("");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        otp: "",
      });
      setOtpSent(false);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
      
    }

   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D7D3BF] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#ECEBDE] p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Create an account</h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                name="name"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                value={formData.email}
                onChange={handleChange}
              />
              {!otpSent && (
                <button
                  type="button"
                  onClick={sendOTP}
                  className=" text-sm flex items-center justify-end font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                >
                  Verify Email
                </button>
              )}
            </div>

            {otpSent && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                <input
                  name="otp"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                  value={formData.otp}
                  onChange={handleChange}
                />
              </div>
            )}
             <div>
              <label className="block text-sm font-medium text-gray-700">Roll Number</label>
              <input
               rollnumber="rollnumber"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                value={formData.rollnumber}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 border rounded bg-black text-white hover:bg-gray-800"
          >
            SIGNUP
          </button>

          {message && <p className="text-center text-green-500 mt-4">{message}</p>}
          {error && <p className="text-center text-red-500 mt-4">{error}</p>}

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/Login" className="font-medium text-indigo-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
