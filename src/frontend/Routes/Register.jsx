import { useState } from "react";
import bg from "../../assets/register.png";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//regsiter page component
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  //validaitng the fields in the form
  const validateForm = () => {
    const errors = {};
    if (name.trim() === "") {
      errors.name = "Name is required";
    }
    if (email.trim() === "") {
      errors.email = "Email is required";
    }
    if (password.trim() === "") {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (confirmPassword.trim() === "") {
      errors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  //handle the register form submiison
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const userData = { name, email, password, confirmPassword };
      axios
        .post(`http://localhost:3001/register`, userData)
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //show or hide the password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-gray-50 bg-opacity-60 rounded-lg p-8 max-w-md w-full space-y-6 backdrop-filter backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-black">Sign Up</h2>
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
              name="email"
              type="email"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md  focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-md font-semibold text-black"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md  focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
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
                className="mt-1 p-3 pr-12 block w-full border border-gray-300 rounded-md bg-opacity-50 focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <BiHide /> : <BiShow />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-md font-semibold text-black"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                className="mt-1 p-3 pr-12 block w-full border border-gray-300 rounded-md  focus:outline-none focus:border-blue-500"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 transform -translate-y-1/2 right-4 text-black cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <BiHide /> : <BiShow />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-black">
          Have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
