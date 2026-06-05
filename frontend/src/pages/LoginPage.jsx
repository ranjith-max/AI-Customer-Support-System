import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

import { loginUser } from "../services/authService";

function LoginPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {
      let response = await loginUser(formData.email,formData.password)

      localStorage.setItem(
        "token",
        response.token
      );

      alert("Login Success");

      navigate("/chat");

    } catch (error) {

      console.log(error);

      alert("Invalid Credentials");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-900">

      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          AI Support Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded-lg text-white font-semibold"
          >
            Login
          </button>
          <p className="text-gray-300 text-center mt-4">
  Don't have an account?{" "}
  <Link
    to="/register"
    className="text-blue-400 hover:text-blue-300"
  >
    Register
  </Link>
</p>
        </form>

      </div>
    
    </div>
  );
}

export default LoginPage;