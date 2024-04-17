import bgImage from "../../assets/bg.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/Auth.context.jsx";
import { BiShow, BiHide } from "react-icons/bi";

//login component
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  //handle login form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/login`, { email, password })
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("token", token);
        setUser(response.data.user);
        console.log(response.data.user);
        navigate("/start");
      })
      .catch(() => {
        alert("Check the credentials");
      });
  };

  //show  or hide password function
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className=" flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="p-8 bg-gray-50 bg-opacity-60 rounded-lg shadow-md  max-w-md w-full space-y-6 backdrop-filter backdrop-blur-md opacity-90">
        <h2 className="text-3xl font-bold text-center text-black">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-md font-semibold text-black"
            >
              Email
            </label>
            <input
              id="email"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md  focus:outline-none focus:border-blue-500"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-md font-semibold text-black"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="mt-1 p-3 pr-12 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {showPassword ? (
                <BiHide
                  className="absolute top-1/2 transform -translate-y-1/2 right-4 text-black cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <BiShow
                  className="absolute top-1/2 transform -translate-y-1/2 right-4 text-black cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>
          <div>
            <button className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Sign In
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-black">
          Do not have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
